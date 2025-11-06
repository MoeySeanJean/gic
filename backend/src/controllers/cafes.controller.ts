import { Request, Response } from 'express';
import { getCafes } from '../application/queries/getCafes.query';
import prisma from '../infrastructure/prismaClient';
import { isValidName } from '../shared/validators';

export const listCafes = async (req: Request, res: Response) => {
  const location = req.query.location as string | undefined;
  const data = await getCafes({ location });
  res.json(data);
};

export const createCafe = async (req: Request, res: Response) => {
  const { name, description, location } = req.body;
  if (!name || !isValidName(name)) return res.status(400).json({ message: 'name invalid, must be 6-10 chars' });
  if (description && description.length > 256) return res.status(400).json({ message: 'description max 256 chars' });

  let logoUrl: string | undefined;
  if ((req as any).file) {
    logoUrl = `/data/${(req as any).file.filename}`;
  }

  const created = await prisma.cafe.create({ data: { name, description, location, logoUrl } });
  res.status(201).json(created);
};

export const updateCafe = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, description, location } = req.body;
  if (name && !isValidName(name)) return res.status(400).json({ message: 'name invalid, must be 6-10 chars' });
  if (description && description.length > 256) return res.status(400).json({ message: 'description max 256 chars' });

  let data: any = { name, description, location };
  if ((req as any).file) data.logoUrl = `/data/${(req as any).file.filename}`;

  const updated = await prisma.cafe.update({ where: { id }, data });
  res.json(updated);
};

export const deleteCafe = async (req: Request, res: Response) => {
  const id = req.params.id;
  await prisma.cafe.delete({ where: { id } });
  res.status(204).send();
};
