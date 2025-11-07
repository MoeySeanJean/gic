import prisma from '../../infrastructure/prismaClient';

export const getCafes = async ({ location }: { location?: string }) => {
  const where = location ? { location: { equals: location } } : {};
  const cafes = await prisma.cafe.findMany({
    where,
    include: { employees: true }
  });
  const mapped = cafes.map((c: any) => ({
    id: c.id,
    name: c.name,
    description: c.description,
    logo: c.logoUrl || null,
    employees: c.employees.length,
    location: c.location
  }));
  mapped.sort((a: any, b: any) => b.employees - a.employees);
  return mapped;
};
