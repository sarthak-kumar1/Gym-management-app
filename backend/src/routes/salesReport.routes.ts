// routes/salesReport.routes.ts
import express from "express";
import { createSalesReport, getSalesReports } from "../controllers/salesReport.controller";

const router = express.Router();
router.post("/", createSalesReport);
router.get("/", getSalesReports);

export default router;