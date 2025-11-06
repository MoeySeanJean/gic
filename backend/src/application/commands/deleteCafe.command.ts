import prisma from '../../infrastructure/prismaClient';

export const deleteCafe = async ({ id }: { id: string }) => {
  await prisma.cafe.delete({ where: { id } });;
}