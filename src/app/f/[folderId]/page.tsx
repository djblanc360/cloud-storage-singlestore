import { db } from "../../../server";
import { files as filesSchema, folders as foldersSchema } from "../../../server/db/schema";
import Contents from "@app/contents";
import { z } from "zod";
import { eq } from "drizzle-orm";

export default async function GoogleDriveClone(props: {params: Promise<{folderId: string}>}) {
  const params = await props.params;
  console.log(params.folderId);

  const parsedFolderId = parseInt(params.folderId);

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const files = await db.select().from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderId));

  const folders = await db.select().from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderId));
  return (
    <Contents files={files} folders={folders} />
  )
}