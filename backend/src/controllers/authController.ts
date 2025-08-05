// src/controllers/authController.ts
import { Request, Response } from 'express';
import UserInfo from '../models/userInfo';
import { generateToken, comparePassword, hashPassword } from '../utils/authUtils';
import Client from '../models/client';
import CoachInfo from '../models/coachInfo';
import adminprofile from '../models/adminProfile';
import Coache from "../models/coache";
import Admin from "../models/admin";
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role?: string;
  };
}
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, activity, target } = req.body;

    // Check if user exists
    const userExists = await UserInfo.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Determine role based on email
    let role = "Client"; // Default role
    
    // Check if email exists in coach or admin collections
    const isCoach = await Coache.findOne({ email });
    if (isCoach) {
      role = "Coach";
    } else {
      const isAdmin = await Admin.findOne({ email });
      if (isAdmin) {
        role = "Admin";
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user with determined role
    const newUser = await UserInfo.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });
    
    console.log('User added:', newUser);

    // Create role-specific profile
    if (role === "Client") {
      const client = await Client.create({
        userId: newUser._id,
        target: target,
        activity: activity
      });
      // console.log('client also added:', client);
    } 
    else if (role === "Coach") {
      const coach = await CoachInfo.create({
        userId: newUser._id
      });
      // console.log('coach also added:', coach);
    } 
    else {
      const admin = await adminprofile.create({
        userId: newUser._id
      });
      // console.log('admin also added:', admin);
    }

    // Return success response
    res.status(201).json({});
    
  } catch (error: any) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// controllers/authController.ts
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await UserInfo.findOne({ email });

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Check password
    const isMatch = await comparePassword(password, user.password);

    if (isMatch) {
      // Generate token with user ID and role
      const token = generateToken(user._id.toString(), user.role);
      
      // Send response with token
      res.status(200).json({token});
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    // Check if user exists in request (set by auth middleware)
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
      return;
    }

    // Find user by ID
    const user = await UserInfo.findById(req.user.id).select('-password');
    
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Return user information
    res.status(200).json({
      success: true,
      firstName: user.firstName,
      lastName: user.lastName,
      // Add any other fields you need
    });
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile',
      error: error.message
    });
  }
};