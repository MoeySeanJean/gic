import prisma from '../../infrastructure/prismaClient';
import dayjs from 'dayjs';

export const getEmployees = async ({ cafe }: { cafe?: string }) => {
  const where = cafe ? { cafe: { name: { equals: cafe } } } : {};
  const employees = await prisma.employee.findMany({
    where,
    include: { cafe: true }
  });
  const mapped = employees.map(e => ({
    id: e.id,
    name: e.name,
    email: e.email,
    phone: e.phone,
    gender: e.gender,
    daysWorked: e.startDate ? dayjs().diff(dayjs(e.startDate), 'day') : 0,
    cafe: e.cafe ? e.cafe.name : ''
  }));
  mapped.sort((a, b) => b.daysWorked - a.daysWorked);
  return mapped;
};
