import express from 'express';
import { getTimeSlotsByCoach } from '../controllers/timeSlotController';

const router = express.Router();

// GET: Get time slots by coachId
router.get('/:coachId', getTimeSlotsByCoach);

export default router;
