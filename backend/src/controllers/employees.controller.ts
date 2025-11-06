import { Request, Response } from 'express';
import { isValidEmployeeId, isValidPhone, isValidEmail, isValidName } from '../shared/validators';
import { getEmployees } from '../application/queries/getEmployees.query';
import { postEmployee } from '../application/commands/postEmployee.command';
import { findEmployeeId } from '../application/queries/findEmployeeId.query';
import { putEmployee } from '../application/commands/putEmployee.command';
import { deleteEmployee } from '../application/commands/deleteEmployee.command';
import { findEmployee } from '../application/queries/findEmployee.query';
import dayjs from 'dayjs';

export const listEmployees = async (req: Request, res: Response) => {
  const cafe = req.query.cafe as string | undefined;
  const result = await getEmployees({ cafe });
  res.json(result);
};

export const createEmployee = async (req: Request, res: Response) => {
  const { name, email, phone, gender, cafeId } = req.body;
  
  const maxNum = await findEmployeeId();
  const id = `UI${(maxNum + 1).toString().padStart(7, '0')}`;
  if (!name || !isValidName(name)) return res.status(400).json({ message: 'invalid name' });
  if (!email || !isValidEmail(email)) return res.status(400).json({ message: 'invalid email' });
  if (!phone || !isValidPhone(phone)) return res.status(400).json({ message: 'invalid phone' });
  if (!['Male', 'Female'].includes(gender)) return res.status(400).json({ message: 'invalid gender' });

  let startDate: string | null;
  if (cafeId) {
    startDate = dayjs().toString();
  } else {
    startDate = null;
  }
  
  const data = await postEmployee({ id, name, email, phone, gender, cafeId, startDate });

  res.status(201).json(data);
};

export const updateEmployee = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { name, email, phone, gender, cafeId } = req.body;

  const employee = await findEmployee(id);
  if (id && !isValidEmployeeId(id)) return res.status(400).json({ message: 'invalid id format' });
  if (name && !isValidName(name)) return res.status(400).json({ message: 'invalid name' });
  if (email && !isValidEmail(email)) return res.status(400).json({ message: 'invalid email' });
  if (phone && !isValidPhone(phone)) return res.status(400).json({ message: 'invalid phone' });
  if (gender && !['Male', 'Female'].includes(gender)) return res.status(400).json({ message: 'invalid gender' });

  let startDate: string | null = employee?.startDate?.toDateString() || null;

  if (cafeId) {
    if (cafeId !== employee?.cafeId) {
      startDate = dayjs().toString();
    }
  } else {
    startDate = null;
  }

  const updated = await putEmployee({ id, name, email, phone, gender, cafeId, startDate });

  res.json(updated);
};

export const removeEmployee = async (req: Request, res: Response) => {
  const id = req.params.id as string;;
  await deleteEmployee({ id });
  res.status(204).send();
};
