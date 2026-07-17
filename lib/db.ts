import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const isDev = process.env.NODE_ENV !== "production";

let prismaOptions: any = {
  log: isDev ? ["error", "warn"] : ["error"],
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient(prismaOptions);

if (isDev) globalForPrisma.prisma = prisma;
