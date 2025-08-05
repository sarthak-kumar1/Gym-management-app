import express from 'express';
import { finishWorkout } from '../controllers/finishWorkoutController';

const finishWorkoutRouter = express.Router();

finishWorkoutRouter.patch('/workouts/:id/finish', finishWorkout);

export default finishWorkoutRouter;
