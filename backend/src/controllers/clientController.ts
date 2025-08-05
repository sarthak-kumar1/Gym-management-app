import mongoose from "mongoose";
import Client from "../models/client";
import { Request, Response } from "express";

export interface AuthRequest extends Request {
    user?: any;
}


export const updateClientController = async (req: AuthRequest, res: Response) => {
    try {

        const  userId  = req.user._id;
        // const userId = new mongoose.Types.ObjectId('681ad00ca9e2d6086c25719a')
        const updatePayload = req.body;

        const userFields: any = {};
        const clientsFields: any = {};

        if ("target" in updatePayload) clientsFields.target = updatePayload.target;
        if ("activity" in updatePayload) clientsFields.activity = updatePayload.activity;

        const updates = [];

        // if (Object.keys(userFields).length > 0) {
        //     updates.push(UserInfo.findByIdAndUpdate(userId, { $set: userFields }, { new: true }));
        // }

        if (Object.keys(clientsFields).length > 0) {
            updates.push(Client.findOneAndUpdate({ userId: userId }, { $set: clientsFields }, { new: true }));
        }

        const [updatedUser, updatedClient] = await Promise.all(updates);

        res.status(200).json({
            message: "Profile updated",
            //   data: {
            //     ...(updatedUser ? { user: updatedUser } : {}),
            //     ...(updatedAdmin ? { admin: updatedAdmin } : {})
            //   }
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Failed to update profile" });
    }
};

export const getClientController = async (req: AuthRequest, res: Response) => {
    try {
// console.log('Hey backend');
        const  userId  = req.user._id;
        // const userId = new mongoose.Types.ObjectId('681ad00ca9e2d6086c25719a');
        const client = await Client.findOne({ userId: userId });
        console.log(client);
        res.status(200).json(client)

    }
    catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
}