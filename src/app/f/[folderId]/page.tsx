import { db } from "../../../server";
import { files, files as filesSchema, folders as foldersSchema } from "../../../server/db/schema";
import Contents from "@app/contents";
import { eq } from "drizzle-orm";

async function getAllParents(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null) {
    const folder = await db.select().from(foldersSchema)
      .where(eq(foldersSchema.id, currentId));

    if (!folder[0]) {
      throw new Error("Parent folder not found");
    }
    parents.unshift(folder[0]); // push to front instead of back
    currentId = folder[0]?.parent ?? null;
  }
  return parents;
}

export default async function GoogleDriveClone(props: {params: Promise<{folderId: string}>}) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);

  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  
  const foldersPromise = db.select().from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderId));
    
  const filesPromise = db.select().from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderId));

  const parentsPromise = await getAllParents(parsedFolderId);

  const [files, folders, parents] = await Promise.all([filesPromise, foldersPromise, parentsPromise]);

  return (
    <Contents files={files} folders={folders} parents={parents} />
  )
}