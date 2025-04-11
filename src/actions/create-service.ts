'use server'

import { auth } from "@clerk/nextjs/server"
import { db } from "../lib/db"
import { revalidatePath } from "next/cache"

export async function createService(formData: FormData) {
  const { userId: externalId } = await auth()
  if (!externalId) throw new Error("Unauthorized")

  const name = formData.get("name") as string
  const projectId = formData.get("projectId") as string

  if (!name || !projectId) throw new Error("Missing fields")

  // ✅ Get internal Prisma user
  const user = await db.user.findUnique({
    where: { externalId },
  })
  if (!user) throw new Error("User not found")

  // ✅ Check project ownership using internal user ID
  const project = await db.project.findUnique({
    where: { id: projectId },
  })
  if (!project || project.userId !== user.id) {
    throw new Error("You do not have access to this project.")
  }

  // ✅ Now you're safe to create the service
  await db.service.create({
    data: {
      name,
      status: "operational",
      projectId,
    },
  })

  revalidatePath("/dashboard")
}
