'use server';

import { auth } from "@clerk/nextjs/server";
import { db } from "../lib/db";
import { revalidatePath } from "next/cache";

export async function createIncident(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const projectId = formData.get("projectId") as string;

  if (!title || !description || !projectId) {
    throw new Error("All fields are required");
  }

  await db.incident.create({
    data: {
      title,
      description,
      status: "open",
      projectId,
    },
  });

  revalidatePath("/dashboard");
}
