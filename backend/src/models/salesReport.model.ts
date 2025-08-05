// models/salesReport.model.ts
import mongoose from "mongoose";

const SalesReportSchema = new mongoose.Schema({
  workoutType: { type: String, required: true },
  reportDate: { type: Date, required: true }, // Add this field
  workoutsLead: { type: Number, required: true },
  clientsAttendanceRatePercent: { type: String, required: true },
  deltaClientsAttendancePercent: { type: String, required: true },
  averageFeedback: { type: Number, required: true },
  minimumFeedback: { type: Number, required: true },
  deltaMinimumFeedbackPercent: { type: String, required: true },
});

export default mongoose.model("SalesReport", SalesReportSchema);