import { Request, Response } from 'express';
import BookedWorkout from '../models/bookedWorkouts'; // Adjust path as needed

export const finishWorkout = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const updatedWorkout = await BookedWorkout.findByIdAndUpdate(
      id,
      { state: 'finished' },
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    return res.status(200).json(updatedWorkout);
  } catch (error) {
    console.error('Error finishing workout:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
