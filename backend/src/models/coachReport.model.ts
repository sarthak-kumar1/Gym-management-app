// models/coachReport.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface ICoachReport extends Document {
  coachName: string;
  coachEmail: string;
  reportDate: Date; // Add this field
  numberOfWorkouts: number;
  deltaWorkoutsPercent: string;
  averageFeedback: number;
  minimumFeedback: number;
  deltaMinimumFeedbackPercent: string;
}

const CoachReportSchema: Schema = new mongoose.Schema({
  coachName: { type: String, required: true },
  coachEmail: { type: String, required: true },
  reportDate: { type: Date, required: true }, // Add this field
  numberOfWorkouts: { type: Number, required: true },
  deltaWorkoutsPercent: { type: String, required: true },
  averageFeedback: { type: Number, required: true },
  minimumFeedback: { type: Number, required: true },
  deltaMinimumFeedbackPercent: { type: String, required: true },
});

export default mongoose.model<ICoachReport>("CoachReport", CoachReportSchema);