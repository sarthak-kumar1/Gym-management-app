import { Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';

import BookedWorkout from '../models/bookedWorkouts';

export const getAllBookedWorkouts = async (req: AuthRequest, res: Response): Promise<any> => {
  const userId = req.user?._id;
  const userRole = req.user?.role?.toLowerCase(); // normalize

  try {
    let workouts;
    if (userRole === 'coach') {
      workouts = await BookedWorkout.find({ coachId: userId });
    } else if (userRole === 'client') {
      workouts = await BookedWorkout.find({ clientId: userId });
    } else {
      return res.status(403).json({ message: 'Unauthorized access: Invalid role' });
    }


    if (!workouts || workouts.length === 0) {
      return res.status(404).json({ message: 'No booked workouts found for this user' });
    }

    return res.status(200).json({ message: 'All booked workouts', data: workouts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching booked workouts' });
  }
};

