import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

class AuthService {
  async register(userData: Partial<IUser>): Promise<{ user: Partial<IUser>; token: string }> {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    // Create new user
    const user = new User(userData);
    await user.save();
    
    // Generate token
    const token = this.generateToken(user);
    
    // Return user without password
    const userWithoutPassword = user.toObject();
    const { password, ...userWithoutPass } = userWithoutPassword;
    
    return { user: userWithoutPass, token };
  }
  
  async login(email: string, password: string): Promise<{ user: Partial<IUser>; token: string }> {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    // Generate token
    const token = this.generateToken(user);
    
    // Return user without password
    const userWithoutPassword = user.toObject();
    const { password: pwd, ...userWithoutPass } = userWithoutPassword;
    
    return { user: userWithoutPass, token };
  }
  
  private generateToken(user: IUser): string {
    return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '7d' }
    );
  }
}

export default new AuthService(); 