import prisma from '../../infrastructure/prismaClient';

export const findEmployee = async (id: string) => {
  const employee = await prisma.employee.findUnique({
    where: { id }
  });
  return employee;
}