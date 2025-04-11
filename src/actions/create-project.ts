'use server'

import { auth } from "@clerk/nextjs/server"
import { db } from "../lib/db"
import { revalidatePath } from "next/cache"

export async function createProject(formData: FormData) {
  const { userId: externalId } = await auth()
  if (!externalId) throw new Error("Unauthorized")

  const name = formData.get("name") as string
  if (!name) throw new Error("Project name is required")

  // ✅ Lookup the actual internal user by Clerk's externalId
  const user = await db.user.findUnique({
    where: { externalId },
  })

  if (!user) throw new Error("User not found")

  await db.project.create({
    data: {
      name,
      userId: user.id, // ✅ Use internal Prisma user id
    },
  })

  revalidatePath("/dashboard")
}
