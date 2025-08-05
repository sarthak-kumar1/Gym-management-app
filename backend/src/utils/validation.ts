// src/utils/validationUtils.ts
import { Request, Response, NextFunction } from 'express';

interface ValidationError {
  field: string;
  message: string;
}

export const validateRegisterInput = (req: Request, res: Response, next: NextFunction): void => {
  const { firstName, lastName, email, password } = req.body;
  const errors: ValidationError[] = [];

  if (!firstName || firstName.trim() === '') {
    errors.push({ field: 'firstName', message: 'First name is required' });
  }

  if (!lastName || lastName.trim() === '') {
    errors.push({ field: 'lastName', message: 'Last name is required' });
  }

  if (!email || !isValidEmail(email)) {
  errors.push({ field: 'email', message: 'Email is invalid' });
}


  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  } else if (password.length < 6) {
    errors.push({ field: 'password', message: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
};

export const validateLoginInput = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;
  const errors: ValidationError[] = [];

  if (!email || email.trim() === '') {
    errors.push({ field: 'email', message: 'Email is required' });
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  next();
};
const isValidEmail = (email: string): boolean => {
  // Basic format check
  if (!email || !email.includes('@') || email.startsWith('@') || email.endsWith('@')) {
    return false;
  }

  const [localPart, domain] = email.split('@');
  
  // Local part validation
  if (!localPart || localPart.length > 64 || /^[.-]|[.-]$|[.-]{2,}/.test(localPart)) {
    return false;
  }
  
  // Domain validation
  if (!domain || domain.length > 255 || !/^[a-zA-Z0-9]/.test(domain) || !/[a-zA-Z0-9]$/.test(domain)) {
    return false;
  }
  
  // Domain parts validation
  const domainParts = domain.split('.');
  if (domainParts.length < 2) {
    return false;
  }
  
  // TLD validation - require minimum 3 characters for TLD
  // This would reject domains like gn.cm
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 3) {
    return false;
  }
  
  // Check for common valid TLDs (optional, but adds security)
  const commonTLDs = ['com', 'org', 'net', 'edu', 'gov', 'mil', 'int', 'info', 'biz', 'name', 'pro', 'museum', 'coop', 'aero', 'xxx', 'idv', 'mobi', 'asia', 'tel', 'travel', 'xyz', 'app', 'dev', 'io', 'co', 'me', 'us', 'uk', 'ca', 'au', 'de', 'jp', 'fr', 'in', 'it', 'ru', 'nl', 'es', 'br'];
  if (!commonTLDs.includes(tld.toLowerCase())) {
    // For uncommon TLDs, require longer length for added security
    if (tld.length < 4) {
      return false;
    }
  }
  
  // Final regex check for allowed characters
  const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return validEmailRegex.test(email);
};