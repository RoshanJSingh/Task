// app/dashboard/client-wrapper.tsx

"use client";

import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import React from "react";

export function ClientWrapper() {
  const { user } = useUser();

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">
        Hello, {user?.firstName || "User"} 👋
      </h2>

      {/* ✅ Sign out button */}
    </div>
  );
}
