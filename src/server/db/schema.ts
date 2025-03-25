import "server-only"

import { bigint, int, text, timestamp, singlestoreTableCreator, index } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `cloud-storage_${name}`,
);

// export const users = createTable("users", {
//   id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
//   name: text("name"),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
// });

export const files = createTable("files_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  size: int("size").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
  
}, (t) => {
  return [index("parent_index").on(t.parent)]
})

export const folders = createTable("folders_table", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
  
}, (t) => {
  return [index("parent_index").on(t.parent)]
})