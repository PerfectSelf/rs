import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import authService from '../services/auth-service';

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, password, firstName, lastName, company, role } = req.body;
      
      const result = await authService.register({
        email,
        password,
        firstName,
        lastName,
        company,
        role,
      });
      
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  
  async login(req: Request, res: Response): Promise<void> {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, password } = req.body;
      
      const result = await authService.login(email, password);
      
      res.status(200).json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }
  
  async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      // The user is already attached to the request by the auth middleware
      if (!req.user) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
      }
      
      res.status(200).json({ user: req.user });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AuthController(); 