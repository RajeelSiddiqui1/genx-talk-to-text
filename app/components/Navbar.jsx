"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";

export function NavbarDemo() {
  return <Navbar />;
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item={
          <Link href="/home">Home</Link>
        } />
        <MenuItem setActive={setActive} active={active} item={
          <Link href="/about">About</Link>
        } />
        <MenuItem setActive={setActive} active={active} item={
          <Link href="/products">Products</Link>
        } />
        <MenuItem setActive={setActive} active={active} item={
          <Link href="/pricing">Pricing</Link>
        } />
      </Menu>
    </div>
  );
}
