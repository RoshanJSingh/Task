import { db } from "../lib/db";
import { auth } from "@clerk/nextjs/server";

export async function getProjects() {
  const { userId } = await auth();
  if (!userId) return [];

  const user = await db.user.findUnique({
    where: { externalId: userId },
  });

  if (!user) return [];

  const projects = await db.project.findMany({
    where: {
      userId: user.id,
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
