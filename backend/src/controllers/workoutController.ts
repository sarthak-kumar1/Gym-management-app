import { Response } from 'express';
import BookedWorkout from '../models/bookedWorkouts';
import { AuthRequest } from '../middlewares/authMiddleware';

// // @desc    Create a new booked workout
// // @route   POST /api/workouts
// // @access  Public

// export const createBookedWorkout = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const {
//       coachId,
//       date,
//       about,
//       timeSlot,
//       type,
//       feedbackId,
//       state
//     } = req.body;

//     const clientId = req.user?._id;

//     if (
//       !clientId ||
//       !coachId ||
//       !date ||
//       !about ||
//       !timeSlot ||
//       !timeSlot.start ||
//       !timeSlot.end ||
//       typeof timeSlot.isBooked !== 'boolean' ||
//       !timeSlot.duration ||
//       !state
//     ) {
//       res.status(400).json({ message: 'Missing required fields in payload' });
//       return;
//     }

//     const selectedDate = new Date(date);
//     console.log(selectedDate);
//     const now = new Date();

//     if (selectedDate < now) {
//       res.status(400).json({ message: 'Cannot book a workout in the past' });
//       return;
//     }

//     const newWorkout = await BookedWorkout.create({
//       clientId,
//       coachId,
//       date: selectedDate,
//       about,
//       timeSlot,
//       type: type || 'default',
//       feedbackId: feedbackId || null,
//       state,
//     });

//     res.status(201).json(newWorkout);
//   } catch (error) {
//     console.error('Error creating workout:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

export const createBookedWorkout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      coachId,
      date,
      about,
      timeSlot,
      type,
      feedbackId,
      state
    } = req.body;

    const clientId = req.user?._id;

    if (
      !clientId ||
      !coachId ||
      !date ||
      !about ||
      !timeSlot ||
      !timeSlot.start ||
      !timeSlot.end ||
      typeof timeSlot.isBooked !== 'boolean' ||
      !timeSlot.duration ||
      !state
    ) {
      res.status(400).json({ message: 'Missing required fields in payload' });
      return;
    }

    // Parse the selected date
    const selectedDate = new Date(date);
    
    // Get current date and reset time to midnight for fair comparison
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // For debugging
    console.log('Selected date:', selectedDate);
    console.log('Today (midnight):', today);
    
    // Compare dates without time component
    if (selectedDate < today) {
      res.status(400).json({ message: 'Cannot book a workout for a past date' });
      return;
    }
    
    // If it's today, we need to check if the requested time slot is in the past
    if (selectedDate.getDate() === today.getDate() && 
        selectedDate.getMonth() === today.getMonth() && 
        selectedDate.getFullYear() === today.getFullYear()) {
        
      // Parse the start time from timeSlot
      const [hours, minutes] = timeSlot.start.split(':').map(Number);
      const startTime = new Date();
      startTime.setHours(hours, minutes, 0, 0);
      
      // If the start time is earlier than current time
      if (startTime < now) {
        res.status(400).json({ message: 'Cannot book a workout for a time that has already passed' });
        return;
      }
    }

    const newWorkout = await BookedWorkout.create({
      clientId,
      coachId,
      date: selectedDate,
      about,
      timeSlot,
      type: type || 'default',
      feedbackId: feedbackId || null,
      state,
    });

    res.status(201).json(newWorkout);
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ message: 'Server error' });
  }
};