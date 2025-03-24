import 'dotenv/config';
import { drizzle } from "drizzle-orm/singlestore";
import mysql from "mysql2/promise";
import { createPool, type Pool } from "mysql2/promise";
import { env } from "~/env";
import * as schema from "./db/schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
// const globalForDb = globalThis as unknown as {
//   client: Client | undefined;
// };

// export const client =
//   globalForDb.client ?? createClient({ url: process.env.DATABASE_URL });
// if (process.env.NODE_ENV !== "production") globalForDb.client = client;

const globalForDb = globalThis as unknown as {
    poolConnection: Pool | undefined;
  };
  
  const poolConnection =
    globalForDb.poolConnection ??
    createPool({
      host: env.SINGLESTORE_HOST,
      port: parseInt(env.SINGLESTORE_PORT),
      user: env.SINGLESTORE_USER,
      password: env.SINGLESTORE_PASSWORD,
      database: env.SINGLESTORE_DB_NAME,
      ssl: {},
      maxIdle: 0,
    });
  if (env.NODE_ENV !== "production") globalForDb.poolConnection = poolConnection;
  
  poolConnection.addListener("error", (err) => {
    console.error("Database connection error:", err);
  });
  
  export const db = drizzle(poolConnection, { schema, mode: 'default' });
  