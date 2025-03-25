import { db } from "../server";
import { files as filesSchema, folders as foldersSchema } from "../server/db/schema";
import Contents from "./contents";

export default async function GoogleDriveClone() {
  const files = await db.select().from(filesSchema);
  const folders = await db.select().from(foldersSchema);
  return (
    <Contents files={files} folders={folders} />
  )
}