// import { Request, Response } from "express";
// import UserInfo from "../models/userInfo";
// import BookedWorkout from "../models/bookedWorkouts";
// import FeedbackInfo from "../models/feedbackInfo";
// import CoachReport from "../models/coachReport.model";
// import SalesReport from "../models/salesReport.model";

// export const generateReport = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { reportType, reportPeriodStart, reportPeriodEnd } = req.body;

//     if (!reportType || !reportPeriodStart || !reportPeriodEnd) {
//       res.status(400).json({ error: "Please provide all required fields" });
//       return;
//     }

//     let reports;

//     // Handling "coach" report type
//     if (reportType === "coach") {
//       // console.log("Generating coach report...");
//       const coaches = await UserInfo.find({
//         role: "Coach",
//         createdAt: { $gte: new Date(reportPeriodStart), $lte: new Date(reportPeriodEnd) }
//       }, "firstName lastName email createdAt");

//       // console.log("Coaches:", coaches);

//       const workoutCounts = await BookedWorkout.aggregate([
//         {
//           $match: {
//             date: { $gte: new Date(reportPeriodStart), $lte: new Date(reportPeriodEnd) },
//           },
//         },
//         {
//           $group: {
//             _id: "$coachId",
//             totalWorkouts: { $sum: 1 },
//           },
//         },
//       ]);

//       // console.log("Workout Counts:", workoutCounts);

//       const feedbackStats = await FeedbackInfo.aggregate([
//         {
//           $group: {
//             _id: "$coachId",
//             averageRating: { $avg: "$rating" },
//             minimumRating: { $min: "$rating" },
//           },
//         },
//       ]);

//       // console.log("Feedback Stats:", feedbackStats);

//       reports = coaches.map((coach) => {
//         const workoutData = workoutCounts.find(
//           (workout) => workout._id.toString() === coach._id.toString()
//         );
//         const feedbackData = feedbackStats.find(
//           (feedback) => feedback._id.toString() === coach._id.toString()
//         );
//         return {
//           coachName: `${coach.firstName} ${coach.lastName}`,
//           coachEmail: coach.email,
//           totalWorkouts: workoutData ? workoutData.totalWorkouts : 0,
//           averageRating: feedbackData ? feedbackData.averageRating.toFixed(2) : "N/A",
//           minimumRating: feedbackData ? feedbackData.minimumRating : "N/A",
//         };
//       });

//       // console.log("Coach Reports:", reports);
//       res.status(200).json(reports);
//     }
//     else if (reportType === "sales") {
//       // console.log("Generating sales report...");
//       const startDate = new Date(reportPeriodStart);
//       const endDate = new Date(reportPeriodEnd);

//       // Aggregate workout types and their counts
//       const workoutStats = await BookedWorkout.aggregate([
//         { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
//         { $group: { _id: { type: "$type", coachId: "$coachId" }, countType: { $sum: 1 } } }
//       ]);

//       // console.log("Workout Stats:", workoutStats);

//       // Aggregate feedback stats for each coach
//       const feedbackStats = await FeedbackInfo.aggregate([
//         { $group: { _id: "$coachId", averageRating: { $avg: "$rating" }, minimumRating: { $min: "$rating" } } }
//       ]);

//       // console.log("Feedback Stats:", feedbackStats);

//       // Combine data for the final sales report
//       const reportMap = new Map<string, { countType: number, ratings: number[] }>();

//       workoutStats.forEach((workout) => {
//         const { type, coachId } = workout._id;
//         const feedbackData = feedbackStats.find(feedback => feedback._id.toString() === coachId.toString());

//         if (!reportMap.has(type)) {
//           reportMap.set(type, { countType: 0, ratings: [] });
//         }

//         const reportEntry = reportMap.get(type)!;
//         reportEntry.countType += workout.countType;
//         if (feedbackData) {
//           reportEntry.ratings.push(feedbackData.averageRating, feedbackData.minimumRating);
//         }
//       });

//       reports = Array.from(reportMap.entries()).map(([type, data]) => {
//         const averageRating = data.ratings.length ? (data.ratings.reduce((a: number, b: number) => a + b, 0) / data.ratings.length).toFixed(2) : "N/A";
//         const minimumRating = data.ratings.length ? Math.min(...data.ratings) : "N/A";

//         return {
//           type,
//           countType: data.countType,
//           averageRating,
//           minimumRating,
//         };
//       });

//       // console.log("Sales Reports:", reports);
//       res.status(200).json(reports);
//     } else {
//       res.status(400).json({ error: "Invalid report type" });
//     }
//   } catch (error) {
//     console.error("Error generating report:", error);
//     res.status(500).json({ error: (error as Error).message });
//   }
// };



import { Request, Response } from "express";
import UserInfo from "../models/userInfo";
import CoachInfo from "../models/coachInfo";
import BookedWorkout from "../models/bookedWorkouts";
import FeedbackInfo from "../models/feedbackInfo";

export const generateReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { reportType, reportPeriodStart, reportPeriodEnd } = req.body;

    // Validate required fields
    if (!reportType || !reportPeriodStart || !reportPeriodEnd) {
      res.status(400).json({ error: "Please provide all required fields" });
      return;
    }

    let reports;

    if (reportType === "coach") {
      // Step 1: Find all coaches within the specified period
      const coaches = await UserInfo.find({
        role: "Coach",
        createdAt: { $gte: new Date(reportPeriodStart), $lte: new Date(reportPeriodEnd) }
      });

      // Extract IDs of coaches
      const coachIds = coaches.map(coach => coach._id);

      // Step 2: Find related CoachInfo entries
      const coachInfos = await CoachInfo.find({ userId: { $in: coachIds } });

      // Step 3: Aggregate workout counts from BookedWorkout
      const workoutCounts = await BookedWorkout.aggregate([
        {
          $match: {
            coachId: { $in: coachInfos.map(info => info._id) },
            date: { $gte: new Date(reportPeriodStart), $lte: new Date(reportPeriodEnd) }
          }
        },
        {
          $group: {
            _id: "$coachId",
            totalWorkouts: { $sum: 1 }
          }
        }
      ]);

      // Step 4: Aggregate feedback stats for each coach
      const feedbackStats = await FeedbackInfo.aggregate([
        {
          $match: {
            coachId: { $in: coachInfos.map(info => info._id) },
            createdAt: { $gte: new Date(reportPeriodStart), $lte: new Date(reportPeriodEnd) }
          }
        },
        {
          $group: {
            _id: "$coachId",
            averageRating: { $avg: "$rating" },
            minimumRating: { $min: "$rating" }
          }
        }
      ]);

      // Construct the report
      reports = coaches.map(coach => {
        const coachInfo = coachInfos.find(info => info.userId.toString() === coach._id.toString());
        const workoutData = workoutCounts.find(workout => workout._id.toString() === coachInfo?._id.toString());
        const feedbackData = feedbackStats.find(feedback => feedback._id.toString() === coachInfo?._id.toString());

        return {
          coachName: `${coach.firstName} ${coach.lastName}`,
          coachEmail: coach.email,
          totalWorkouts: workoutData ? workoutData.totalWorkouts : 0,
          averageRating: feedbackData ? feedbackData.averageRating.toFixed(2) : "N/A",
          minimumRating: feedbackData ? feedbackData.minimumRating : "N/A"
        };
      });

      res.status(200).json(reports);

    } else if (reportType === "sales") {
      // Sales Report Logic
      const startDate = new Date(reportPeriodStart);
      const endDate = new Date(reportPeriodEnd);

      // Aggregate workout types and their counts
      const workoutStats = await BookedWorkout.aggregate([
        { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
        { $group: { _id: { type: "$type", coachId: "$coachId" }, countType: { $sum: 1 } } }
      ]);

      // Aggregate feedback stats for each coach
      const feedbackStats = await FeedbackInfo.aggregate([
        { $group: { _id: "$coachId", averageRating: { $avg: "$rating" }, minimumRating: { $min: "$rating" } } }
      ]);

      // Combine data for the final sales report
      const reportMap = new Map<string, { countType: number, ratings: number[] }>();

      workoutStats.forEach((workout) => {
        const { type, coachId } = workout._id;
        const feedbackData = feedbackStats.find(feedback => feedback._id.toString() === coachId.toString());

        if (!reportMap.has(type)) {
          reportMap.set(type, { countType: 0, ratings: [] });
        }

        const reportEntry = reportMap.get(type)!;
        reportEntry.countType += workout.countType;
        if (feedbackData) {
          reportEntry.ratings.push(feedbackData.averageRating, feedbackData.minimumRating);
        }
      });

      reports = Array.from(reportMap.entries()).map(([type, data]) => {
        const averageRating = data.ratings.length ? (data.ratings.reduce((a: number, b: number) => a + b, 0) / data.ratings.length).toFixed(2) : "N/A";
        const minimumRating = data.ratings.length ? Math.min(...data.ratings) : "N/A";

        return {
          type,
          countType: data.countType,
          averageRating,
          minimumRating,
        };
      });

      res.status(200).json(reports);

    } else {
      res.status(400).json({ error: "Invalid report type" });
    }

  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};
