import express from 'express';
// import { getWorkouts } from '../controllers/searchFunctionality';
import { searchCoaches } from '../controllers/searchFunctionality';

const router = express.Router();

// router.get('/workouts', getWorkouts);
router.get('/workouts',  searchCoaches );


export default router;
