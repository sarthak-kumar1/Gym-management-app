import express from 'express';
import { markTimeSlotAsBooked } from '../controllers/timeSlotModificationController';

const router = express.Router();

router.patch('/', markTimeSlotAsBooked);

export default router;
