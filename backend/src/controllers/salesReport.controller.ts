// controllers/salesReport.controller.ts
import { Request, Response } from "express";
import SalesReport from "../models/salesReport.model";
 
export const createSalesReport = async (req: Request, res: Response) => {
  try {
    const report = new SalesReport(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error });
  }
};
 
export const getSalesReports = async (req: Request, res: Response) => {
  try {
    const { workoutType, reportPeriodStart, reportPeriodEnd } = req.query;
 
    const filter: any = {};
    if (workoutType) filter.workoutType = workoutType;
    if (reportPeriodStart && reportPeriodEnd) {
      filter.reportPeriodStart = { $gte: new Date(reportPeriodStart as string) };
      filter.reportPeriodEnd = { $lte: new Date(reportPeriodEnd as string) };
    }
 
    const reports = await SalesReport.find(filter);
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error });
  }
};
