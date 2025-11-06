import { Router } from 'express';
import { listEmployees, createEmployee, updateEmployee, removeEmployee } from '../controllers/employees.controller';

const router = Router();

router.get('/', listEmployees);
router.post('/', createEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', removeEmployee);

export default router;
