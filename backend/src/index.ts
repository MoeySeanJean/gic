import { createApp } from './app';
import dotenv from 'dotenv';
import prisma from './infrastructure/prismaClient';

dotenv.config();

const app = createApp();
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
  try {
    await prisma.$connect();
    console.log('Prisma connected');
  } catch (e) {
    console.error('Failed to connect to DB', e);
  }
});
