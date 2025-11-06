import prisma from '../../infrastructure/prismaClient';

export const putEmployee = async ({ id, name, email, phone, gender, cafeId, startDate }: { id: string, name: string, email: string, phone: string, gender: string, cafeId?: string, startDate: string }) => {
  const updated = await prisma.employee.update({
    where: { id },
    data: {
      name: name || undefined,
      email: email || undefined,
      phone: phone || undefined,
      gender: gender || undefined,
      cafeId: cafeId || null,
      startDate: startDate ? new Date(startDate) : undefined
    }
  });
  return updated;
}