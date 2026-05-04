import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import { mkdirSync, existsSync } from "fs";
import { dirname } from "path";

function resolveDbPath(): string {
  const raw = process.env.DATABASE_URL ?? "file:./data/med.db";
  const path = raw.startsWith("file:") ? raw.slice("file:".length) : raw;
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return path;
}

const globalForDb = globalThis as unknown as {
  sqlite: Database.Database | undefined;
  db: ReturnType<typeof drizzle<typeof schema>> | undefined;
};

export function getSqlite(): Database.Database {
  if (!globalForDb.sqlite) {
    globalForDb.sqlite = new Database(resolveDbPath());
    globalForDb.sqlite.pragma("journal_mode = WAL");
  }
  return globalForDb.sqlite;
}

export function getDb() {
  if (!globalForDb.db) {
    globalForDb.db = drizzle(getSqlite(), { schema });
  }
  return globalForDb.db;
}
