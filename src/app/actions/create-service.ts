'use server';

import { db } from "../../lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
const { userId } = await auth();

export async function createService(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const projectId = formData.get("projectId") as string;

  if (!name || !projectId) throw new Error("Missing fields");

  await db.service.create({
    data: {
      name,
      projectId,
      userId,
      status: "operational", // or another default status
    },
  });
  

  revalidatePath("/dashboard");
}
