import { Request, Response } from 'express';
import BookedWorkout from '../models/bookedWorkouts'; // Adjust path as needed

export const cancelWorkout = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const updatedWorkout = await BookedWorkout.findByIdAndUpdate(
      id,
      { state: 'cancelled','timeSlot.isBooked': false },
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    return res.status(200).json(updatedWorkout);
  } catch (error) {
    console.error('Error cancelling workout:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

