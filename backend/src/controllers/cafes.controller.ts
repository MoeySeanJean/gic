import { Request, Response } from 'express';
import { getCafes } from '../application/queries/getCafes.query';
import { postCafe } from '../application/commands/postCafe.command';
import { putCafe } from '../application/commands/putCafe.command';
import { deleteCafe } from '../application/commands/deleteCafe.command';
import { findCafe } from '../application/queries/findCafe.query';
import { isValidDescription, isValidName } from '../shared/validators';

export const listCafes = async (req: Request, res: Response) => {
  const location = req.query.location as string | undefined;
  const data = await getCafes({ location });
  res.json(data);
};

export const createCafe = async (req: Request, res: Response) => {
  const { name, description, location } = req.body;
  if (!name || !isValidName(name)) return res.status(400).json({ message: 'name invalid, must be 6-10 chars' });
  if (!description || !isValidDescription(description)) return res.status(400).json({ message: 'description max 256 chars' });
  if (!location) return res.status(400).json({ message: 'location is required' });

  let logoUrl: string | undefined;
  if ((req as any).file) {
    logoUrl = `/data/${(req as any).file.filename}`;
  }

  const data = await postCafe({ name, description, location, logoUrl });
  
  res.status(201).json(data);
};

export const updateCafe = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const exists = await findCafe({ id });
  if (!exists) return res.status(404).json({ message: 'cafe not found' });

  const { name, description, location } = req.body;
  if (name && !isValidName(name)) return res.status(400).json({ message: 'name invalid, must be 6-10 chars' });
  if (description && !isValidDescription(description)) return res.status(400).json({ message: 'description max 256 chars' });

  let logoUrl: string | undefined;
  if ((req as any).file) {
    logoUrl = `/data/${(req as any).file.filename}`;
  }

  const data = await putCafe({ id, name, description, location, logoUrl });

  res.json(data);
};

export const removeCafe = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const exists = await findCafe({ id });
  if (!exists) return res.status(404).json({ message: 'cafe not found' });

  await deleteCafe({ id });
  res.status(204).send();
};
