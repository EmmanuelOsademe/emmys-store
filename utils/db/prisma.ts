import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if(process.env.NODE_ENV === "production"){
    prisma = new PrismaClient();
}

prisma = globalForPrisma.prisma ?? new PrismaClient({log: ['query']});

export default prisma;