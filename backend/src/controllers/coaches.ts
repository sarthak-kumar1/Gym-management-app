


import { Request, Response, NextFunction } from "express";
import CoachInfo from "../models/coachInfo";

export const getCoachDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const coaches = await CoachInfo.find().populate('userId');

    if (!coaches || coaches.length === 0) {
      res.status(404).json({ message: "No coaches found" });
      return;
    }

    const transformedCoaches = coaches
      .filter(coach => coach.userId && (coach.userId as any).role === 'Coach')
      .map(coach => {
        const user = coach.userId as any;
        return {
          id: coach._id.toString(),
          imageUrl: coach.profileImage || "",
          motivationPitch: coach.about || "", // ✅ Using coach.title correctly
          name: `${user.firstName} ${user.lastName}`,
          rating: coach.rating || 0,
          title:coach.title
        };
      });

    res.status(200).json({
      content: transformedCoaches
    });
  } catch (error) {
    console.error("Error fetching coach details:", error);
    next(error);
  }
};
