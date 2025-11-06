import prisma from '../../infrastructure/prismaClient';

export const postEmployee = async ({ id, name, email, phone, gender, cafeId, startDate }: { id: string, name: string, email: string, phone: string, gender: string, cafeId?: string, startDate?: string | null }) => {
  const created = await prisma.employee.create({
    data: {
      id,
      name,
      email,
      phone,
      gender,
      cafeId: cafeId || null,
      startDate: startDate ? new Date(startDate) : null
    }
  });
  return created;
}