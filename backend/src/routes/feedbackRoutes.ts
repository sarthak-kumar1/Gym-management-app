
import express from 'express';
// import { FeedbackController } from '../controllers/feedbackController';
import { FeedbackController } from '../controllers/feedbackController';

const feedbackRouter = express.Router();
const feedbackController = new FeedbackController();

/**
 * @route POST /feedbacks/client
 * @desc Submit feedback as a client to a coach
 * @access Public
 */
feedbackRouter.post('/client', feedbackController.submitClientFeedback.bind(feedbackController));


export default feedbackRouter;

