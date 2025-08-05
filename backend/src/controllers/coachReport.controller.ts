// controllers/coachReport.controller.ts
import { Request, Response } from "express";
import CoachReport from "../models/coachReport.model";

export const createCoachReport = async (req: Request, res: Response): Promise<void> => {
  try {
    const report = new CoachReport(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getCoachReports = async (req: Request, res: Response): Promise<void> => {
  try {
    const { coachName, reportPeriodStart, reportPeriodEnd } = req.query;

    const filter: any = {};
    if (coachName) filter.coachName = coachName;
    if (reportPeriodStart && reportPeriodEnd) {
      filter.reportPeriodStart = { $gte: new Date(reportPeriodStart as string) };
      filter.reportPeriodEnd = { $lte: new Date(reportPeriodEnd as string) };
    }

    console.log("Filter:", filter);

    const reports = await CoachReport.find(filter);
    console.log("Reports Found:", reports);
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error retrieving reports:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};