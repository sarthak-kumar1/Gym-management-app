import express from "express";
import { getCoachDetail } from "../controllers/coaches";
import { getCoach } from "../controllers/coachController";
import { protect } from "../middlewares/authMiddleware";

const coachesRouter = express.Router();

coachesRouter.get("/", getCoachDetail);  // ✅ works now
coachesRouter.get("/:id", protect, getCoach);

export default coachesRouter;
