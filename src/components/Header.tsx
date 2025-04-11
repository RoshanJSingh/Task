'use client';

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Header() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <header className="w-full p-4 border-b">
      <nav className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">📈 StatusPage</h1>
        <div className="flex gap-4">
          <Link href="/dashboard" className="text-sm hover:underline">
            Dashboard
          </Link>

          {!isSignedIn && (
            <Link href="/sign-in" className="text-sm hover:underline">
              Sign In
            </Link>
          )}

          {isSignedIn && (
            <SignOutButton>
              <span className="cursor-pointer text-sm hover:underline">
                Sign Out
              </span>
            </SignOutButton>
          )}
        </div>
      </nav>
    </header>
  );
}
