import { Request, Response, NextFunction } from "express";
import CoachInfo from "../models/coachInfo";
import userSchema from "../models/userInfo";
import UserInfo from "../models/userInfo";

// ✅ Make the return type explicit: Promise<void>
export const getCoach = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const coach = await CoachInfo.findById(req.params.id);
    const name = await UserInfo.findById(coach?.userId);

    
    if (!coach) {
      res.status(404).json({ message: "Coach not found" });
      return; // ✅ Ensure early return
    }

    const transformedCoach = {
      id: coach._id.toString(),
      imageUrl: coach.profileImage || "",
      name: `${name?.firstName} ${name?.lastName}` || "",
      rating: coach.rating || 0,
      title: coach.title,
      about: coach.about || "",
      specialization:coach.specializations||"",
      certificates:coach.fileUrls||""
    };

    // ✅ Now wrap it in the expected format
    res.status(200).json(transformedCoach);
  } catch (error) {
    console.error("Error fetching coach:", error);
    next(error);
  }
};
