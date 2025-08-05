import UserInfo from "../models/userInfo";
import Client from "../models/client";
import adminprofile from "../models/adminProfile";
import CoachInfo from "../models/coachInfo";
import { Request, Response } from "express";

export const userDetailsController = async (req: Request, res: Response) => {
    try {
        const newUser = await UserInfo.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        console.log('User added:', newUser);
        const user = await UserInfo.findOne({ email: req.body.email });

        if(req.body.role === "Client")
        {
            const client = await Client.create({
                userId: user?user._id : null,
                target: req.body.target,
                activity: req.body.activity
            });
            console.log('client also added:', client);
        }
        else if(req.body.role === "Coach")
        {
            const coach = await CoachInfo.create({
                userId: user?user._id : null
            });
            console.log('coach also added:', coach);
        }
        else{
            const admin = await adminprofile.create({
                userId: user?user._id : null
            });
            console.log('admin also added:', admin);
        }
        
        res.send(`User added:', ${newUser}`);


      } catch (error) {
        console.error('Error adding user:', error);
      }
    };