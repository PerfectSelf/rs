import { Router } from 'express';
import { body, param } from 'express-validator';
import projectController from '../controllers/project-controller';
import authMiddleware from '../middleware/auth-middleware';

const router = Router();

// Protect all project routes
router.use(authMiddleware);

// Create project
router.post('/', [
  body('name').notEmpty().withMessage('Project name is required'),
  body('client').notEmpty().withMessage('Client name is required'),
  body('description').optional(),
  body('team').optional().isArray(),
], projectController.createProject);

// Get all projects for the authenticated user
router.get('/', projectController.listProjects);

// Get project by ID
router.get('/:id', [
  param('id').notEmpty().withMessage('Project ID is required'),
], projectController.getProject);

// Update project
router.put('/:id', [
  param('id').notEmpty().withMessage('Project ID is required'),
  body('name').optional(),
  body('description').optional(),
  body('client').optional(),
  body('status').optional().isIn(['active', 'completed', 'archived']),
], projectController.updateProject);

// Add team member to project
router.post('/:id/team', [
  param('id').notEmpty().withMessage('Project ID is required'),
  body('userId').notEmpty().withMessage('User ID is required'),
], projectController.addTeamMember);

// Remove team member from project
router.delete('/:id/team/:userId', [
  param('id').notEmpty().withMessage('Project ID is required'),
  param('userId').notEmpty().withMessage('User ID is required'),
], projectController.removeTeamMember);

// Delete project
router.delete('/:id', [
  param('id').notEmpty().withMessage('Project ID is required'),
], projectController.deleteProject);

export default router; 