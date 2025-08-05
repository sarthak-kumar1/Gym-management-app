import mongoose from "mongoose";
import Client from "../models/client";
import { Request, Response } from "express";
import CoachInfo from "../models/coachInfo";
import adminprofile from "../models/adminProfile";

export interface AuthRequest extends Request {
    user?: any;
}



export const updateAdminController = async (req: AuthRequest , res: Response) => {
    try {
        const  userId  = req.user._id;
        // const userId1 = new mongoose.Types.ObjectId('681aad436b9e1f5e2b79db7d')
        const updatePayload = req.body;

        // if (!userId) {
        //     return res.status(400).json({ error: "User ID not found in request" });
        // }

        const userFields: any = {};
        const adminFields: any = {};

        if ("phoneNumber" in updatePayload) adminFields.phoneNumber = updatePayload.phoneNumber;

        const updates = [];

        // if (Object.keys(userFields).length > 0) {
        //     updates.push(UserInfo.findByIdAndUpdate(userId1, { $set: userFields }, { new: true }));
        // }


        if (Object.keys(adminFields).length > 0) {
            updates.push(adminprofile.findOneAndUpdate({ userId: userId }, { $set: adminFields }, { new: true }));
        }


        const [updatedUser, updatedAdmin] = await Promise.all(updates);

        res.status(200).json({
            message: "Profile updated",
            //   data: {
            //     ...(updatedUser ? { user: updatedUser } : {}),
            //     ...(updatedAdmin ? { admin: updatedAdmin } : {})
            //   }
        });
        // res.send('User added:');
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Failed to update profile" });
    }
};

export const getAdminController = async (req: AuthRequest, res: Response) => {
    try {
// console.log('Hey backend');
         const  userId  = req.user._id;
        // const userId = new mongoose.Types.ObjectId('681aad436b9e1f5e2b79db7d');
        const admin = await adminprofile.findOne({ userId: userId });
        console.log(admin);
        res.status(200).json(admin)

    }
    catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
}