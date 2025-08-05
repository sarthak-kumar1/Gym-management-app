// src/routes/coachRoutes.ts
import express from 'express';
import { searchCoaches } from '../controllers/coachSearchController';


const findCoach = express.Router();
findCoach.get('/search', searchCoaches);

export default findCoach;
