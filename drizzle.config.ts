import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import { mkdirSync, existsSync } from "fs";
import { dirname } from "path";

const url = process.env.DATABASE_URL ?? "file:./data/med.db";
const dbPath = url.startsWith("file:") ? url.slice("file:".length) : url;
const dir = dirname(dbPath);
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: { url: dbPath },
});
