import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "../../../lib/db";


export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.redirect("/sign-in");
  }

  const formData = await req.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string | null;
  const projectId = new URL(req.url).searchParams.get("projectId");

  if (!name || !projectId) {
    return new NextResponse("Missing required fields", { status: 400 });
  }

  await db.service.create({
    data: {
      name,
      description: description || "",
      projectId,
      userId,
      status: "operational", // default status
    },
  });

  return NextResponse.redirect("/dashboard");
}
