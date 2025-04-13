// src/actions/create-service.ts
'use server'

import { auth } from "@clerk/nextjs/server"
import { db } from "../lib/db"
import { revalidatePath } from "next/cache"

export async function createService(formData: FormData) {
  const { userId: externalId } = await auth()
  if (!externalId) throw new Error("Unauthorized")

  const name = formData.get("name") as string
  const projectId = formData.get("projectId") as string

  if (!name || !projectId) throw new Error("Missing required fields")

  // Verify project exists AND belongs to this user (using externalId)
  const project = await db.project.findFirst({
    where: {
      id: projectId,
      userId: externalId // Match against Clerk's externalId
    }
  })

  if (!project) {
    console.error(`Access denied - User ${externalId} tried to access project ${projectId}`)
    throw new Error("You don't have permission to add services to this project")
  }

  // Create the service
  await db.service.create({
    data: {
      name,
      status: "operational",
      projectId,
    },
  })

  revalidatePath("/dashboard")
}