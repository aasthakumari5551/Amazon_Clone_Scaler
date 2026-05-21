import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "../../generated/prisma/client";
import { env } from "./env";

const adapter = new PrismaNeon({ connectionString: env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

export default prisma;
