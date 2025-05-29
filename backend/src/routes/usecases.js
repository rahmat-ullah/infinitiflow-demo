import express from 'express';
import { optionalAuth } from '../middleware/auth.js';
import {
  getAllUseCases,
  getUseCase,
  getRoleSolutions,
  getIndustrySolutions,
  getCategories,
  createUseCase,
  updateUseCase,
  deleteUseCase,
  createRoleSolution,
  updateRoleSolution,
  deleteRoleSolution,
  createIndustrySolution,
  updateIndustrySolution,
  deleteIndustrySolution
} from '../controllers/useCasesController.js';

const router = express.Router();

// Apply optional authentication to all routes
router.use(optionalAuth);

// Use Cases routes
router.get('/', getAllUseCases);
router.post('/', createUseCase);
router.get('/categories', getCategories);
router.get('/role-solutions', getRoleSolutions);
router.post('/role-solutions', createRoleSolution);
router.get('/industry-solutions', getIndustrySolutions);
router.post('/industry-solutions', createIndustrySolution);
router.get('/:id', getUseCase);
router.put('/:id', updateUseCase);
router.delete('/:id', deleteUseCase);

// Role Solutions routes
router.put('/role-solutions/:id', updateRoleSolution);
router.delete('/role-solutions/:id', deleteRoleSolution);

// Industry Solutions routes
router.put('/industry-solutions/:id', updateIndustrySolution);
router.delete('/industry-solutions/:id', deleteIndustrySolution);

export default router; 