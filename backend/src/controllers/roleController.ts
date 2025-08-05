import Coache from "../models/coache";
import { Request, Response } from "express";
import Admin from "../models/admin";

export const roleController = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const coach = await Coache.findOne({ email }); 
        if(coach) res.send("Coach");
        else{
            const admin = await Admin.findOne({ email });
            res.send(admin? "Admin" : "Client"); 
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    };