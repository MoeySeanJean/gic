import prisma from '../../infrastructure/prismaClient';

export const postCafe = async ({ name, description, location, logoUrl }: { name: string, description: string, location: string, logoUrl?: string }) => {
  const created = await prisma.cafe.create({
    data: {
      name: name,
      description: description,
      location: location,
      logoUrl: logoUrl || null
    }
  });
  return created;
}