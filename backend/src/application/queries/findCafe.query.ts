import prisma from '../../infrastructure/prismaClient';

export const findCafe = async ({ id }: { id: string }) => {
    const cafe = await prisma.cafe.findUnique({ where: { id } });
    return cafe;
}