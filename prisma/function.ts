import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { Bindings } from "../types";

export default function Prisma({ DB }: Bindings) {
  const adapter = new PrismaD1(DB);
  const prisma = new PrismaClient({ adapter });
  return prisma;
}
