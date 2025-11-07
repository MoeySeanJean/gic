import prisma from '../../infrastructure/prismaClient';

export const findEmployeeId = async () => {
  const lastEmployee = await prisma.employee.findFirst({
    where: {},
    orderBy: { id: 'desc' },
  });
  if (lastEmployee) {
    return parseInt(lastEmployee.id.replace(/^UI/, ''), 10);
  }
  return 0;
}