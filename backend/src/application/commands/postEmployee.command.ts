import prisma from '../../infrastructure/prismaClient';

export const postEmployee = async ({ id, name, email, phone, gender, cafeId, startDate }: { id: string, name: string, email: string, phone: string, gender: string, cafeId?: string, startDate: string }) => {
  const created = await prisma.employee.create({
    data: {
      id,
      name,
      email,
      phone,
      gender,
      cafeId: cafeId || null,
      startDate: new Date(startDate)
    }
  });
  return created;
}