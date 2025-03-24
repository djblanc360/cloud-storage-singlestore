import { defineConfig } from "drizzle-kit";
import { env } from "~/env";

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  dialect: "singlestore",
  tablesFilter: ["cloud-storage_*"],
  dbCredentials: {
    host: env.SINGLESTORE_HOST,
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASSWORD,
    port: parseInt(env.SINGLESTORE_PORT),
    database: env.SINGLESTORE_DB_NAME,
    ssl: {},
  },
})
