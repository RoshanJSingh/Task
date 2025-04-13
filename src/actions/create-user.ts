// src/lib/createUser.ts
'use server'
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from '@clerk/clerk-sdk-node';


export async function createUser() {
  const { userId } = await auth();
  if (!userId) return;

  const existingUser = await db.user.findUnique({
    where: { externalId: userId },
  });

  if (!existingUser) {
    const clerkUser = await clerkClient.users.getUser(userId);
    await db.user.create({
      data: {
        externalId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
      },
    });
  }
}
