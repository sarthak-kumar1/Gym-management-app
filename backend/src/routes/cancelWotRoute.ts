import express from 'express';
import { cancelWorkout } from '../controllers/cancelWorkoutController';

const router = express.Router();

// Cancel a workout by ID
router.patch('/workouts/:id/cancel', cancelWorkout);

export default router;

