import prisma from '../../infrastructure/prismaClient';
import dayjs from 'dayjs';

export const getEmployees = async ({ cafe }: { cafe?: string }) => {
  let cafeWhere: any = {};
  if (cafe) cafeWhere = { OR: [{ id: cafe }, { name: { equals: cafe } }] };

  let cafeIds: string[] | undefined;
  if (cafe) {
    const found = await prisma.cafe.findMany({ where: cafeWhere });
    if (found.length === 0) return [];
    cafeIds = found.map(f => f.id);
  }

  const where = cafeIds ? { cafeId: { in: cafeIds } } : {};
  const emps = await prisma.employee.findMany({ where });

  const cafeMap = new Map<string, string>();
  const cafeIdsToFetch = Array.from(new Set(emps.filter(e => e.cafeId).map(e => e.cafeId as string)));
  if (cafeIdsToFetch.length) {
    const cafes = await prisma.cafe.findMany({ where: { id: { in: cafeIdsToFetch } } });
    cafes.forEach(c => cafeMap.set(c.id, c.name));
  }

  const final = emps.map(e => ({
    id: e.id,
    name: e.name,
    email_address: e.email,
    phone_number: e.phone,
    days_worked: dayjs().diff(dayjs(e.startDate), 'day'),
    cafe: e.cafeId ? cafeMap.get(e.cafeId) ?? '' : ''
  }));

  final.sort((a, b) => b.days_worked - a.days_worked);
  return final;
};
