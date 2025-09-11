"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/app/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);

  const links = [
    { label: "Home", href: "/dashboard", icon: <IconBrandTabler className="h-5 w-5" /> },
    { label: "Profile", href: "/dashboard/profile", icon: <IconUserBolt className="h-5 w-5" /> },
    { label: "Settings", href: "/dashboard/settings", icon: <IconSettings className="h-5 w-5" /> },
    { label: "Upload", href: "/dashboard/upload", icon: <IconArrowLeft className="h-5 w-5" /> },
  ];

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody
          className={cn(
            "flex flex-col justify-between",
            "bg-gradient-to-b from-black via-gray-900 to-gray-800",
            "border-r border-white" // 👈 white right border
          )}
        >
          <div className="flex flex-col gap-4">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
