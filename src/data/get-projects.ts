import { auth } from "@clerk/nextjs/server";
import { db } from "../lib/db";
export async function getProjects() {
  const { userId } = await auth();
  if (!userId) return [];


  const projects = await db.project.findMany({
    where: {
      userId: userId, // Match the Clerk ID directly
    },
    include: {
      services: true,
      incidents: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return projects;
}