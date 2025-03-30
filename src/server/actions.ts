"use server";

import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { db } from "./index";
import { file_table } from "./db/schema";

import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utApi = new UTApi();

export async function deleteFile(fileId: number) {
  const session = await auth();
  if (!session?.userId) {
    return { error: "Unauthorized" };
  }

  const [file ]= await db
  .select()
  .from(file_table)
  .where(
    (and(eq(file_table.id, fileId), eq(file_table.ownerId, session.userId)))
  );

  if (!file) {
    throw new Error("File not found");
  }

  const utapiResult = await utApi.deleteFiles([
    file.url.replace("https://utfs.io/f/", ""),
  ]);

  console.log(utapiResult);

  const dbDeleteResult = await db
  .delete(file_table)
  .where(eq(file_table.id, fileId));

  console.log(dbDeleteResult);

  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}
