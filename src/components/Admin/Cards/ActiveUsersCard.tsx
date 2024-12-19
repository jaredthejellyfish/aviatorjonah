import { Skeleton } from "@/components/ui/skeleton";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { getActiveUsers } from "@/utils/helpers/getActiveUsers";

export async function ActiveUsersCard() {
  const data = await getActiveUsers();

  const activeUsersThisMonth = data?.activeUsersThisMonth;
  const activeUsersLastMonth = data?.activeUsersLastMonth;

  if (!activeUsersThisMonth || !activeUsersLastMonth) {
    return <ActiveUsersCardSkeleton />;
  }

  const percentageChange =
    ((activeUsersThisMonth - activeUsersLastMonth) / activeUsersLastMonth) *
    100;

  const percentageChangeRounded = percentageChange.toFixed(0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data?.activeUsersThisMonth}</div>
        <p className="text-xs text-muted-foreground">
          {percentageChangeRounded}% from last month
        </p>
      </CardContent>
    </Card>
  );
}

export function ActiveUsersCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 mb-2 w-24" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  );
}
