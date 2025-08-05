import mongoose from "mongoose";
import { Request, Response } from "express";
import CoachInfo from "../models/coachInfo";
import adminprofile from "../models/adminProfile";
import FeedbackInfo from "../models/feedbackInfo";



export const getFeedbackController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        // const userId = new mongoose.Types.ObjectId('6819186f8e1d9e877e2c1033');
        const feedbacks = await FeedbackInfo.find({ coachId: userId });
        console.log(feedbacks);
        // res.status(200).json(feedback)


        const formattedFeedbacks = feedbacks.map(feedback => {
            const date = new Date(feedback.date);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

            return {
                ...feedback.toObject(), // Convert Mongoose doc to plain object
                date: formattedDate
            };
        });

        res.status(200).json(formattedFeedbacks);

    }
    catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ error: "Failed to fetch feedback" });
    }
}