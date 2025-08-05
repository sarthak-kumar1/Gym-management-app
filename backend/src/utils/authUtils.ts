// src/utils/authUtils.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const generateToken = (userId: string, role: string): string => {
  return jwt.sign(
    { 
      id: userId,
      role: role
    }, 
    process.env.JWT_SECRET || 'your_jwt_secret', 
    {
      expiresIn: '30d',
    }
  );
};
// Compare password
export const comparePassword = async (enteredPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};