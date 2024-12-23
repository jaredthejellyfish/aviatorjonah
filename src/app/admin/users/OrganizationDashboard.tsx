"use client";

import { useState, useEffect } from "react";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import type {
  OrganizationMembershipResource,
  OrganizationCustomRoleKey,
} from "@clerk/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { toast } from "sonner";
import { OrganizationDashboardSkeleton } from "./OrganizationDashboardSkeleton";
import Link from "next/link";

export default function OrganizationDashboard() {
  const [inviteEmail, setInviteEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<OrganizationMembershipResource[]>([]);
  const { organization } = useOrganization();
  const {
    isLoaded: isOrgListLoaded,
    userMemberships,
    userInvitations,
    setActive,
  } = useOrganizationList({
    userMemberships: {
      infinite: true,
      keepPreviousData: true,
    },
    userInvitations: {
      infinite: true,
      keepPreviousData: true,
    },
  });

  useEffect(() => {
    const fetchMembers = async () => {
      if (!organization) return;
      try {
        const response = await organization.getMemberships();
        setMembers(response.data);
      } catch (err) {
        console.error("Failed to fetch members:", err);
        toast.error("Failed to fetch members");
      }
    };

    fetchMembers();
  }, [organization]);

  const inviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organization) return;
    setIsLoading(true);
    try {
      await organization.inviteMember({
        emailAddress: inviteEmail,
        role: "basic_member" as OrganizationCustomRoleKey,
      });
      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail("");
    } catch (err) {
      console.error("Failed to invite user:", err);
      toast.error("Failed to invite user");
    } finally {
      setIsLoading(false);
    }
  };

  const changeUserRole = async (
    userId: string,
    newRole: OrganizationCustomRoleKey,
  ) => {
    if (!organization) return;
    setIsLoading(true);
    try {
      await organization.updateMember({
        userId,
        role: newRole,
      });
      toast.success("Role updated successfully");

      // Refresh members list
      const response = await organization.getMemberships();
      setMembers(response.data);
    } catch (err) {
      console.error("Failed to update role:", err);
      toast.error("Failed to update role");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOrgListLoaded) {
    return <OrganizationDashboardSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <Breadcrumb className="mb-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/admin">Admin</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>User Management</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold mb-6">Organization Management</h1>

      <Tabs defaultValue="members" className="space-y-4">
        <div className="flex md:flex-row flex-col justify-between items-center gap-y-3">
          <TabsList>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="invites">Invitations</TabsTrigger>
          </TabsList>

          <Select
            value={organization?.id}
            onValueChange={(value) => {
              setActive({
                organization: value,
              });
              const orgName = userMemberships.data?.find(
                (m) => m.organization.id === value,
              )?.organization.name;
              if (orgName) {
                toast.success(`Switched to ${orgName}`);
              }
            }}
          >
            <SelectTrigger className="bg-black max-w-[300px]">
              <SelectValue>
                {organization?.name || "Select organization"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {userMemberships.data?.map((membership) => (
                <SelectItem
                  key={membership.id}
                  value={membership.organization.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex flex-col">
                    <span>{membership.organization.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {membership.role}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="members">
          <Card>
            <CardHeader>
              <CardTitle>Invite New Member</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={inviteUser} className="flex gap-4 mb-6">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Inviting..." : "Send Invite"}
                </Button>
              </form>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        {`${member.publicUserData.firstName || ""} ${
                          member.publicUserData.lastName || ""
                        }`}
                      </TableCell>
                      <TableCell>{member.publicUserData.identifier}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <Select
                          onValueChange={(value) =>
                            changeUserRole(
                              member.publicUserData.userId as string,
                              value as OrganizationCustomRoleKey,
                            )
                          }
                          defaultValue={member.role}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic_member">
                              Basic Member
                            </SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invites">
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userInvitations.data?.map((invitation) => (
                    <TableRow key={invitation.id}>
                      <TableCell>{invitation.emailAddress}</TableCell>
                      <TableCell>{invitation.role}</TableCell>
                      <TableCell>Pending</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          onClick={async () => {
                            try {
                              if (organization) {
                                await organization.removeMember(invitation.id);
                                toast.success("Invitation removed");
                                await userInvitations.revalidate();
                              }
                            } catch (err) {
                              console.error(
                                "Failed to remove invitation:",
                                err,
                              );
                              toast.error("Failed to remove invitation");
                            }
                          }}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
