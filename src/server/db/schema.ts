import { bigint, int, text, timestamp, singlestoreTable, singlestoreTableCreator } from "drizzle-orm/singlestore-core";

// export const createTable = singlestoreTableCreator(
//   (name) => `cloud-storage_${name}`,
// );

export const users = singlestoreTable("users_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  name: text("name"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});