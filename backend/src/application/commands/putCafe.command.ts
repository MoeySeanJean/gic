import prisma from '../../infrastructure/prismaClient';

export const putCafe = async ({ id, name, description, location, logoUrl }: { id: string, name: string, description: string, location: string, logoUrl?: string }) => {
  const updated = await prisma.cafe.update({
    where: { id },
    data: {
      name: name || undefined,
      description: description || undefined,
      location: location || undefined,
      logoUrl: logoUrl || null
    }
  });
  return updated;
}