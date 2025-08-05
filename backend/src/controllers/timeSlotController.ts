import { Request, Response } from 'express';
import TimeSlot from '../models/timeSlots';

// @desc    Get all time slots for a coach
// @route   GET /api/timeslots/:coachId
// @access  Public
export const getTimeSlotsByCoach = async (req: Request, res: Response): Promise<void> => {
  const { coachId } = req.params;

  try {
    if (!coachId) {
      res.status(400).json({ message: 'Coach ID is required' });
      return;
    }

    const timeSlots = await TimeSlot.find({ coachId });

    if (!timeSlots || timeSlots.length === 0) {
      res.status(404).json({ message: 'No time slots found for this coach' });
      return;
    }

    res.status(200).json(timeSlots);
  } catch (error) {
    console.error('Error fetching time slots:', error);
    res.status(500).json({ message: 'Server error fetching time slots' });
  }
};

