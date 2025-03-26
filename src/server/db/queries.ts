import "server-only";

import { db } from "../index";
import { folder_table as foldersSchema, file_table as filesSchema } from "./schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
  getAllParentsForFolder: async function (folderId: number) {
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
  },

  getFolders: function (folderId: number) {
      return db
          .select()
          .from(foldersSchema)
          .where(eq(foldersSchema.parent, folderId))
  },

  getFiles: function (folderId: number) {
      return db
          .select()
          .from(filesSchema)
          .where(eq(filesSchema.parent, folderId))
  }

}

