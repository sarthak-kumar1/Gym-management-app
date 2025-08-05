import { Request, Response } from 'express';
import TimeSlot from '../models/timeSlots';

// @desc    Update time slot's isBooked field to true
// @route   PATCH /api/timeslots/book
// @access  Private or Public (depends on your middleware)

export const markTimeSlotAsBooked = async (req: Request, res: Response): Promise<void> => {
  try {
    const { coachId, date, startTime, isBooked } = req.body;

    if (
      !coachId ||
      !date ||
      !startTime ||
      typeof isBooked !== 'boolean'
    ) {
      res.status(400).json({ message: 'Missing required fields: coachId, date, startTime, or isBooked' });
      return;
    }

    const result = await TimeSlot.updateOne(
      {
        coachId,
        date: new Date(date),
        'timeSlots.startTime': startTime,
      },
      {
        $set: { 'timeSlots.$.isBooked': isBooked },
      }
    );

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: 'Time slot not found or already in desired state' });
    } else {
      res.status(200).json({ message: `Time slot ${isBooked ? 'booked' : 'cancelled'} successfully` });
    }
  } catch (error) {
    console.error('Error updating time slot:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

