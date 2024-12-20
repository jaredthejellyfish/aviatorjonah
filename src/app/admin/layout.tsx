import React from "react";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "AviatorJonah | Admin",
  description: "Admin dashboard for AviatorJonah.",
};

function AdminLayout({ children }: Props) {
  return children;
}

export default AdminLayout;
