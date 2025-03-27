import "server-only";

import { db } from "../index";
import { 
  folder_table as foldersSchema, 
  file_table as filesSchema,
  DB_FileType,
  DB_FolderType
} from "./schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

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

export const MUTATIONS = {
  createFile: async function (input: {
    file : {
      name: string;
      size: number;
      url: string;
      parent: number;
    };
    userId: string;
  }) {
    console.log("=== Database Debug Logs ===");
    console.log("1. Input received:", input);
    
    try {
      console.log("2. Preparing database insert...");
      const values = {
        ...input.file,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.log("3. Values to insert:", values);
      
      const result = await db.insert(filesSchema).values(values);
      console.log("4. Insert result:", result);
      
      return result;
    } catch (error) {
      console.error("=== Database Error Details ===");
      console.error("Error type:", error?.constructor?.name);
      console.error("Error message:", error instanceof Error ? error.message : "Unknown error");
      console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
      throw error;
    }
  }
}