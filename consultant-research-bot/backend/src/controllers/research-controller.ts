import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import deepResearchService from '../services/deep-research-service';

class ResearchController {
  async initiateResearch(req: Request, res: Response): Promise<void> {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      // Make sure user is authenticated
      if (!req.user) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }

      const { query, projectId, template, depth, breadth, clientContext, industryFocus } = req.body;
      
      const researchId = await deepResearchService.initiateResearch({
        query,
        projectId,
        userId: req.user.id,
        template,
        depth,
        breadth,
        clientContext,
        industryFocus,
      });
      
      res.status(202).json({
        message: 'Research initiated',
        researchId,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  
  async getResearch(req: Request, res: Response): Promise<void> {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { id } = req.params;
      const research = await deepResearchService.getResearch(id);
      
      if (!research) {
        res.status(404).json({ error: 'Research not found' });
        return;
      }
      
      res.status(200).json(research);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async listResearchForProject(req: Request, res: Response): Promise<void> {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { projectId } = req.params;
      const researchList = await deepResearchService.listResearchForProject(projectId);
      
      res.status(200).json(researchList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ResearchController(); 