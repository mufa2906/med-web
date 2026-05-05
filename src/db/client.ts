import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  connection: ReturnType<typeof postgres> | undefined;
  db: ReturnType<typeof drizzle<typeof schema>> | undefined;
};

export function getDb() {
  if (!globalForDb.db) {
    if (!globalForDb.connection) {
      globalForDb.connection = postgres(process.env.DATABASE_URL!);
    }
    globalForDb.db = drizzle(globalForDb.connection, { schema });
  }
  return globalForDb.db;
}
