import { Router } from 'express';
import { body, param } from 'express-validator';
import researchController from '../controllers/research-controller';
import authMiddleware from '../middleware/auth-middleware';

const router = Router();

// Protect all research routes
router.use(authMiddleware);

// Initiate research
router.post('/', [
  body('query').notEmpty().withMessage('Research query is required'),
  body('projectId').notEmpty().withMessage('Project ID is required'),
  body('template').isIn([
    'quick_overview', 
    'deep_dive', 
    'comprehensive', 
    'competitive_analysis', 
    'custom'
  ]).withMessage('Invalid template'),
  body('depth').optional().isInt({ min: 1, max: 5 }).withMessage('Depth must be between 1 and 5'),
  body('breadth').optional().isInt({ min: 2, max: 10 }).withMessage('Breadth must be between 2 and 10'),
], researchController.initiateResearch);

// Get research by ID
router.get('/:id', [
  param('id').notEmpty().withMessage('Research ID is required'),
], researchController.getResearch);

// List research for a project
router.get('/project/:projectId', [
  param('projectId').notEmpty().withMessage('Project ID is required'),
], researchController.listResearchForProject);

export default router; 