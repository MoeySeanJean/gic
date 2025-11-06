import prisma from '../../infrastructure/prismaClient';

export const deleteEmployee = async ({ id }: { id: string }) => {
  await prisma.employee.delete({ where: { id } });
}