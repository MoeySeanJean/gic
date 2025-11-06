import { Router } from 'express';
import { listEmployees, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employees.controller';

const router = Router();

router.get('/', listEmployees);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router;
