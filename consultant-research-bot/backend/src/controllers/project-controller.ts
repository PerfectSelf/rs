import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Project from '../models/Project';

class ProjectController {
  async createProject(req: Request, res: Response): Promise<void> {
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

      const { name, description, client, team } = req.body;
      
      // Create a new project
      const project = new Project({
        name,
        description,
        client,
        owner: req.user.id,
        team: team || [],
      });
      
      await project.save();
      
      res.status(201).json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  
  async getProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const project = await Project.findById(id)
        .populate('owner', 'firstName lastName email')
        .populate('team', 'firstName lastName email');
      
      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }
      
      res.status(200).json(project);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async listProjects(req: Request, res: Response): Promise<void> {
    try {
      // Make sure user is authenticated
      if (!req.user) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }
      
      const projects = await Project.find({
        $or: [
          { owner: req.user.id },
          { team: req.user.id }
        ]
      }).sort({ updatedAt: -1 });
      
      res.status(200).json(projects);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async updateProject(req: Request, res: Response): Promise<void> {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      
      const { id } = req.params;
      const { name, description, client, status } = req.body;
      
      const project = await Project.findById(id);
      
      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }
      
      // Check if user is the owner
      if (project.owner.toString() !== req.user?.id) {
        res.status(403).json({ error: 'Not authorized to update this project' });
        return;
      }
      
      // Update project
      project.name = name || project.name;
      project.description = description || project.description;
      project.client = client || project.client;
      project.status = status || project.status;
      
      await project.save();
      
      res.status(200).json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  
  async addTeamMember(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      
      const project = await Project.findById(id);
      
      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }
      
      // Check if user is the owner
      if (project.owner.toString() !== req.user?.id) {
        res.status(403).json({ error: 'Not authorized to update this project' });
        return;
      }
      
      // Add team member if not already in the team
      if (!project.team.includes(userId)) {
        project.team.push(userId);
      }
      
      await project.save();
      
      res.status(200).json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  
  async removeTeamMember(req: Request, res: Response): Promise<void> {
    try {
      const { id, userId } = req.params;
      
      const project = await Project.findById(id);
      
      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }
      
      // Check if user is the owner
      if (project.owner.toString() !== req.user?.id) {
        res.status(403).json({ error: 'Not authorized to update this project' });
        return;
      }
      
      // Remove team member
      project.team = project.team.filter(
        memberId => memberId.toString() !== userId
      );
      
      await project.save();
      
      res.status(200).json(project);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  
  async deleteProject(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const project = await Project.findById(id);
      
      if (!project) {
        res.status(404).json({ error: 'Project not found' });
        return;
      }
      
      // Check if user is the owner
      if (project.owner.toString() !== req.user?.id) {
        res.status(403).json({ error: 'Not authorized to delete this project' });
        return;
      }
      
      await Project.findByIdAndDelete(id);
      
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ProjectController(); 