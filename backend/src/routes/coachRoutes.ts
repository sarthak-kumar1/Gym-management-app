import express from "express";
import { getCoach } from "../controllers/coachController";

const coachRouter = express.Router();

coachRouter.get("/:id", getCoach);  // ✅ works now

export default coachRouter;
