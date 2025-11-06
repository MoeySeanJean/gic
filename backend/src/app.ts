import express from 'express';
import cors from 'cors';
import cafesRoutes from './routes/cafes.routes';
import employeesRoutes from './routes/employees.routes';
import path from 'path';

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/uploads', express.static(path.join(process.cwd(), process.env.UPLOAD_DIR || './uploads')));
  app.use('/api/v1/cafes', cafesRoutes);
  app.use('/api/v1/employees', employeesRoutes);
  app.get('/', (_req, res) => res.send('API'));
  return app;
};
