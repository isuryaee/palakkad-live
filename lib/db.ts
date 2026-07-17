import { PrismaClient } from "@prisma/client";
import Database from "better-sqlite3";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// For SQLite (development/testing)
const isDev = process.env.NODE_ENV !== "production";
const dbPath = process.env.DATABASE_URL?.replace("file:", "") || "dev.db";

let prismaOptions: any = {
  log: isDev ? ["error", "warn"] : ["error"],
};

// If DATABASE_URL is set to SQLite, use better-sqlite3 adapter
if (!process.env.DATABASE_URL?.startsWith("postgresql") && !process.env.DATABASE_URL?.startsWith("mysql")) {
  const sqliteDb = new Database(dbPath);
  prismaOptions.adapter = sqliteDb;
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient(prismaOptions);

if (isDev) globalForPrisma.prisma = prisma;
