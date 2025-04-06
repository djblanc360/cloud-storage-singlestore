import "server-only";

import { db } from "../index";
import { 
  folder_table as foldersSchema, 
  file_table as filesSchema,
  DB_FileType,
  DB_FolderType
} from "./schema";
import { eq, and, isNull } from "drizzle-orm";
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
          .orderBy(foldersSchema.id)
  },

  getFiles: function (folderId: number) {
      return db
          .select()
          .from(filesSchema)
          .where(eq(filesSchema.parent, folderId))
          .orderBy(filesSchema.id)
  },

  getFolderById: async function (folderId: number) {
    const folder = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.id, folderId));

    if (!folder[0]) {
      throw new Error("Folder not found");
    }
    return folder[0];
  },

  getUserRootFolder: async function (userId: string) {
    const rootFolder = await db
    .select()
    .from(foldersSchema)
    .where(
      and(eq(foldersSchema.ownerId, userId), isNull(foldersSchema.parent)
    ))
    .orderBy(foldersSchema.id);

    if (!rootFolder[0]) {
      throw new Error("Root folder not found");
    }
    return rootFolder[0];
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
    return await db.insert(filesSchema).values({
      ...input.file,
      ownerId: input.userId,
      createdAt: new Date(),
      updatedAt: new Date(),  
    });
  },

  onboardUser: async function (userId: string) {
    const rootFolder = await db.insert(foldersSchema).values({
      name: "Root",
      ownerId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).$returningId(); // returns the id of the inserted folder

    const rootFolderId = rootFolder[0]!.id;

    await db.insert(foldersSchema).values([
      {
        name: "Trash",
        ownerId: userId,
        parent: rootFolderId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Shared",
        ownerId: userId,
        parent: rootFolderId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Documents",
        ownerId: userId,
        parent: rootFolderId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);

    return rootFolderId;
  }
}