// src/lib/createUser.ts
import { db } from "./db";
import { currentUser } from "@clerk/nextjs/server";

export async function createUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return;

  const existingUser = await db.user.findUnique({
    where: { externalId: clerkUser.id },
  });

  if (existingUser) return;

  await db.user.create({
    data: {
      externalId: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
    },
  });
}
// This function creates a user in the database if they don't already exist.