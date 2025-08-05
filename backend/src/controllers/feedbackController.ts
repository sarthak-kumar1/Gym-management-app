// import { Request, Response } from 'express';
// import FeedbackInfo from '../models/feedbackInfo';
// import mongoose from 'mongoose';

// export class FeedbackController {
//   // CLIENT ➝ COACH FEEDBACK (with rating)
//   public async submitClientFeedback(req: Request, res: Response): Promise<void> {
//     try {
//       console.log('Request body:', req.body);

//       const { coachId, clientName, clientImageUrl, message, rating } = req.body;

//       if (!coachId || !message || rating === undefined) {
//         res.status(400).json({ success: false, message: 'Coach ID, message, and rating are required' });
//         return;
//       }

//       if (!mongoose.Types.ObjectId.isValid(coachId)) {
//         res.status(400).json({ success: false, message: 'Invalid Coach ID' });
//         return;
//       }

//       const feedback = new FeedbackInfo({
//         coachId: new mongoose.Types.ObjectId(coachId),
//         clientName: clientName || 'Anonymous Client',
//         clientImageUrl: clientImageUrl || '',
//         state:"finished",
//         message,
//         rating
//       });

//       await feedback.save();

//       res.status(201).json({
//         success: true,
//         message: 'Feedback submitted successfully'
//       });
//     } catch (error) {
//       console.error('Error submitting client feedback:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Internal server error',
//         error: error instanceof Error ? error.message : 'Unknown error'
//       });
//     }
//   }

  

  
// }

// // Export instance
// export const feedbackController = new FeedbackController();

import { Request, Response } from 'express';
import FeedbackInfo from '../models/feedbackInfo';
import mongoose from 'mongoose';
 
export class FeedbackController {
  // CLIENT ➝ COACH FEEDBACK (with rating)
  public async submitClientFeedback(req: Request, res: Response): Promise<void> {
    try {
      console.log('📩 Incoming request body:', req.body);
 
      const { coachId, clientName, clientImageUrl, message, rating } = req.body;
 
      console.log('🔍 Parsed values:', { coachId, clientName, clientImageUrl, message, rating });
 
      if (!coachId || !message || rating === undefined) {
        console.warn('⚠️ Validation failed - missing required fields');
        res.status(400).json({ success: false, message: 'Coach ID, message, and rating are required' });
        return;
      }
 
      if (!mongoose.Types.ObjectId.isValid(coachId)) {
        console.warn('⚠️ Invalid coachId format:', coachId);
        res.status(400).json({ success: false, message: 'Invalid Coach ID' });
        return;
      }
 
      const feedbackData = {
        coachId: new mongoose.Types.ObjectId(coachId),
        clientName: clientName || 'Anonymous Client',
        clientImageUrl: clientImageUrl || '',
        state: 'finished',
        message,
        rating
      };
 
      console.log('📝 Saving feedback to DB:', feedbackData);
 
      const feedback = new FeedbackInfo(feedbackData);
      await feedback.save();
 
      console.log('✅ Feedback saved successfully');
      res.status(201).json({
        success: true,
        message: 'Feedback submitted successfully'
      });
    } catch (error) {
      console.error('🔥 Error submitting client feedback:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
 
// Export instance
export const feedbackController = new FeedbackController();
 