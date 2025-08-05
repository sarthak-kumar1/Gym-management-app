import { Request, Response } from "express";
import Express from "express";
import Admin from "../models/admin";
import UserInfo from "../models/userInfo";
import Client from "../models/client";
import mongoose from "mongoose";
import adminprofile from "../models/adminProfile";
import CoachInfo from "../models/coachInfo";
import { hashPassword } from "../utils/authUtils";
import bcrypt from 'bcrypt';


  export interface AuthRequest extends Request {
    user?: any;
  }


export const updatePasswordController = async (req: AuthRequest, res: Response) => {
    try {
        const  userId  = req.user._id;
        // const userId = new mongoose.Types.ObjectId('681ab3d67026b77e0837dff2')
        const { currentPassword, newPassword } = req.body;
        const user = await UserInfo.findById(userId);
        const isMatch = await bcrypt.compare(currentPassword , user?.password || "");
        if (!isMatch) {
            throw new Error("Invalid old password");
        }
        const password = await hashPassword(newPassword);
        const updatedUser = await UserInfo.findByIdAndUpdate(
            userId,
            { $set: { password: password } },
            { new: true }
        );
        res.status(200).json({ message: "Password updated" });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: error || "Failed to update profile" });
    }
}

export interface AuthRequest extends Request {
  user?: any;
}

export const updateUserController = async (req: AuthRequest, res: Response) => {
    try {
        const userId  = req.user._id;
        // console.log("Pranav",userId, req.user);
        // const userId = new mongoose.Types.ObjectId('68204c960930cc255ddcce82')
        const userDetails = req.body;

        const updatedUser = await UserInfo.findByIdAndUpdate(
            userId,
            { $set: userDetails },
            { new: true }
        );
        res.status(200).json({ message: "User updated" });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: error || "Failed to update profile" });
    }
}


// export const updateImageController = async (req: Request , res: Response) => {
//     try {
//         //const { userId } = req;
//         const userId = new mongoose.Types.ObjectId('681864502e23dfb16ea71209')

//         const file = (req as MulterRequest).file;

//         const fileEntry = `/uploads/images/${file.filename}`;

//         // Find your document and update
//         const doc = await UserInfo.findByIdAndUpdate(
//             userId,
//             { $set: { profileImage: fileEntry } },
//             { new: true }
//         );

//         res.status(200).json({ message: 'File uploaded and saved.', fileEntry });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// }