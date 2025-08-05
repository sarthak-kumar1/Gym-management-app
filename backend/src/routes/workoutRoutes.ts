import { createBookedWorkout } from '../controllers/workoutController';
import express from 'express';
import { protect} from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', protect, createBookedWorkout);

export default router;
