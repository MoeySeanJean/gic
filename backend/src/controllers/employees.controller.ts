import { Request, Response } from 'express';
import prisma from '../infrastructure/prismaClient';
import { isValidEmployeeId, isValidPhone, isValidEmail, isValidName } from '../shared/validators';
import { getEmployees } from '../application/queries/getEmployees.query';

export const listEmployees = async (req: Request, res: Response) => {
  const cafe = req.query.cafe as string | undefined;
  const result = await getEmployees({ cafe });
  res.json(result);
};

export const createEmployee = async (req: Request, res: Response) => {
  const { id, name, email, phone, gender, cafeId, startDate } = req.body;
  if (!id || !isValidEmployeeId(id)) return res.status(400).json({ message: 'invalid id format' });
  if (!name || !isValidName(name)) return res.status(400).json({ message: 'invalid name' });
  if (!email || !isValidEmail(email)) return res.status(400).json({ message: 'invalid email' });
  if (!phone || !isValidPhone(phone)) return res.status(400).json({ message: 'invalid phone' });
  if (!['Male', 'Female'].includes(gender)) return res.status(400).json({ message: 'invalid gender' });
  if (!startDate) return res.status(400).json({ message: 'startDate required' });

  const exists = await prisma.employee.findUnique({ where: { id } });
  if (exists) return res.status(409).json({ message: 'employee id already exists' });

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

  res.status(201).json(created);
};

export const updateEmployee = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email, phone, gender, cafeId, startDate } = req.body;
  if (name && !isValidName(name)) return res.status(400).json({ message: 'invalid name' });
  if (email && !isValidEmail(email)) return res.status(400).json({ message: 'invalid email' });
  if (phone && !isValidPhone(phone)) return res.status(400).json({ message: 'invalid phone' });
  if (gender && !['Male', 'Female'].includes(gender)) return res.status(400).json({ message: 'invalid gender' });

  const updated = await prisma.employee.update({
    where: { id },
    data: {
      name,
      email,
      phone,
      gender,
      cafeId: cafeId || null,
      startDate: startDate ? new Date(startDate) : undefined
    }
  });

  res.json(updated);
};

export const deleteEmployee = async (req: Request, res: Response) => {
  const id = req.params.id;
  await prisma.employee.delete({ where: { id } });
  res.status(204).send();
};
