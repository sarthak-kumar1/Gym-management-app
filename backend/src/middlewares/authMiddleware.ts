
interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export interface AuthRequest extends Request {
  user?: any;
}


// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserInfo from '../models/userInfo';
 
interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}
 
export interface AuthRequest extends Request {
  user?: any;
}
 

 

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token;
   
    // Check for Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
     
      // Log token for debugging (remove in production)
      console.log('Received token:', token);
     
      if (!token) {
        res.status(401).json({ message: 'Not authorized, token is empty' });
        return;
      }
     
      try {
        // Verify token
        const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
        const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
       
        console.log('Decoded token:', decoded);
       
        // Find user by id
        const user = await UserInfo.findById(decoded.id).select('-password');

        if (!user) {
          res.status(401).json({ message: 'Not authorized, user not found' });
          return;
        }

        // Set user in request
        req.user = user;
        next();
      } catch (jwtError) {
        console.error('JWT verification error:', jwtError);
        res.status(401).json({ message: 'Not authorized, invalid token' });
      }
    } else {
      console.log('No authorization header or incorrect format');
      console.log('Headers received:', req.headers);
      res.status(401).json({ message: 'Not authorized, no token provided' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error in authentication' });
  }
};


export const admin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

// Add this function to your existing authMiddleware.ts
export const checkRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }
    
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Access denied. Not authorized for this role.' });
      return;
    }
    
    next();
  };
};

// Convenience middlewares for common role checks
export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  checkRole(['Admin'])(req, res, next);
};

export const coachOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  checkRole(['Coach'])(req, res, next);
};

export const clientOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  checkRole(['Client'])(req, res, next);
};
