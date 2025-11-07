import express from 'express';
import cors from 'cors';
import cafesRoutes from './routes/cafes.routes';
import employeesRoutes from './routes/employees.routes';
import path from 'path';

export const createApp = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/data', express.static(path.join(process.cwd(), process.env.DATA_DIR || './data')));
  app.use('/api/v1/cafes', cafesRoutes);
  app.use('/api/v1/employees', employeesRoutes);
  app.use(express.static(path.join(__dirname, 'public')));
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  return app;
};
