import mongoose from "mongoose";
import Client from "../models/client";
import { Request, Response } from "express";
import CoachInfo from "../models/coachInfo";
import adminprofile from "../models/adminProfile";

export interface AuthRequest extends Request {
    user?: any;
}


export const updateCoachController = async (req: AuthRequest, res: Response) => {
    try {
        const userId  = req.user._id;
        // const userId = new mongoose.Types.ObjectId('681ab3d67026b77e0837dff2')
        const coachDetails = req.body;

        const coach = await CoachInfo.findOne({ userId: userId })
        let updatedSpecializations = coach?.specializations || [];

        if (coachDetails.specializations) {
            if (Array.isArray(coachDetails.specializations)) {
              updatedSpecializations = [...updatedSpecializations, ...coachDetails.specializations];
            } else {
              updatedSpecializations.push(coachDetails.specializations);
            }
          }
      
          // Update the coach document
          const updatedUser = await CoachInfo.findOneAndUpdate(
            { userId: userId },
            {
              $set: {
                ...coachDetails,
                specializations: updatedSpecializations
              }
            },
            { new: true }
          );

        // const updatedUser = await CoachInfo.findOneAndUpdate(
        //     { userId: userId },
        //     { $set: coachDetails },
        //     { new: true }
        // );
        res.status(200).json({ message: "Coach updated" });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: error || "Failed to update profile" });
    }
}


export const getCoachController = async (req: AuthRequest, res: Response) => {
    try {
      
        const userId  = req.user._id;
        // const userId = new mongoose.Types.ObjectId('681ab3d67026b77e0837dff2');
        const coach = await CoachInfo.findOne({ userId: userId });
        console.log(coach);
        res.status(200).json(coach)

    }
    catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
}


// export const updateCertificateController = async (req: Request , res: Response) => {
//     try {
//         //const { userId } = req;
//         const userId = new mongoose.Types.ObjectId('681864502e23dfb16ea71209')

//         const file = (req as MulterRequest).file;

//         const fileEntry = {
//             name: file.originalname,
//             url: `/uploads/certificates/${file.filename}`, // or full URL if hosted elsewhere
//             uploadDate: new Date()
//         };

//         // Find your document and update
//         const doc = await CoachInfo.findByIdAndUpdate(
//             userId,
//             { $set: { fileUrls: fileEntry } },
//             { new: true }
//         );

//         res.status(200).json({ message: 'File uploaded and saved.', fileEntry });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// }