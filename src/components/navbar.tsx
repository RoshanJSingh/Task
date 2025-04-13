"use client";

import React from "react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b shadow-sm bg-white">
      <Link href="/" className="text-xl font-bold text-black">
        StatusPage
      </Link>

      <div className="flex items-center space-x-6">
        <Link href="/dashboard" className="text-sm text-gray-700 hover:text-black">
          Dashboard
        </Link>

        {isSignedIn ? (
          <SignOutButton>
            <button className="text-sm text-gray-700 hover:text-black">Sign Out</button>
          </SignOutButton>
        ) : (
          <Link href="/sign-in" className="text-sm text-gray-700 hover:text-black">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
