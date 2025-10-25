import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../src/generated/prisma/edge";

export function createPrismaClient(databaseUrl: string) {
  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  }).$extends(withAccelerate());
}
