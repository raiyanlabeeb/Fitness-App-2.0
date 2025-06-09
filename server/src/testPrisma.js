import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function returnAllUsers(){
    return await prisma.user.findMany();
}
