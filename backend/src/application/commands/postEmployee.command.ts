import dayjs from 'dayjs';
import prisma from '../../infrastructure/prismaClient';

export const postEmployee = async ({ id, name, email, phone, gender, cafeId }: { id: string, name: string, email: string, phone: string, gender: string, cafeId?: string }) => {
  const created = await prisma.employee.create({
    data: {
      id,
      name,
      email,
      phone,
      gender,
      cafeId: cafeId || null,
      startDate: new Date(dayjs().toString())
    }
  });
  return created;
}