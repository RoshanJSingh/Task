import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import slugify from "slugify";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name } = await req.json();

  const slug = slugify(name, { lower: true });

  const organization = await db.organization.create({
    data: {
      name,
      slug,
      members: {
        create: {
          userId,
          role: "OWNER",
        },
      },
    },
  });

  return NextResponse.json({ success: true, organization });
}
