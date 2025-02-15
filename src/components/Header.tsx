"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between items-center border shadow-sm">
      <div className="flex flex-row items-center">
        <Image
          src="/chart-donut.svg"
          alt="logo"
          width={50}
          height={50}
          priority
        />
        <span className="text-blue-800 font-bold text-xl">BudgetMate</span>
      </div>
      {isSignedIn ? (
        <div className="flex gap-3 items-center">
          <Link href="/dashboard">
            <Button className="rounded-full text-white ">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <Link href="/sign-in">
            <Button className="rounded-full text-white ">Get Started</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
