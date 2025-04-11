import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import * as React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="p-6">
      {children}
    </main>
  );
}
