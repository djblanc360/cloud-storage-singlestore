// import "server-only"

import { bigint, int, text, timestamp, singlestoreTableCreator, index } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `cloud_storage_${name}`,
);

// export const users = createTable("users", {
//   id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
//   name: text("name"),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
// });

export const file_table = createTable("files_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  ownerId: text("owner_id").notNull(),
  name: text("name").notNull(),
  size: int("size").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
  
}, (t) => {
  return [
    index("parent_index").on(t.parent),
    index("owner_id_index").on(t.ownerId)
  ]
})

export type DB_FileType = typeof file_table.$inferSelect;

export const folder_table = createTable("folders_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  ownerId: text("owner_id").notNull(),
  name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => {
  return [
    index("parent_index").on(t.parent),
    index("owner_id_index").on(t.ownerId)
  ]
})

export type DB_FolderType = typeof folder_table.$inferSelect;
