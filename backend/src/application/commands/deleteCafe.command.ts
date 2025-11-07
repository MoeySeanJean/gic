import prisma from '../../infrastructure/prismaClient';

export const deleteCafe = async ({ id }: { id: string }) => {
  await prisma.employee.updateMany({
    where: { cafeId: id },
    data: { cafeId: null, startDate: null },
  })
  await prisma.cafe.delete({ where: { id } });;
}