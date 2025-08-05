// routes/coachReport.routes.ts
import express from "express";
import { createCoachReport, getCoachReports } from "../controllers/coachReport.controller";

const router = express.Router();
router.post("/", createCoachReport);
router.get("/", getCoachReports);

export default router;