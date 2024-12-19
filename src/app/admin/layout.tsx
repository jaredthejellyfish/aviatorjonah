import AdminNotAuthorized from "@/components/Admin/AdminNotAuthorized";
import { Protect } from "@clerk/nextjs";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function AdminLayout({ children }: Props) {
  return (
    <Protect
      permission="org:content_creator:access"
      fallback={<AdminNotAuthorized />}
    >
      {children}
    </Protect>
  );
}

export default AdminLayout;
