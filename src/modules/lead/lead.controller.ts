import {
  Request,
  Response,
} from "express";

import {
  createLeadService,
  deleteLeadService,
  getLeadsService,
  getSingleLeadService,
  updateLeadService,
} from "./lead.service";

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead =
      await createLeadService(
        req.body
      );

    res.status(201).json({
      success: true,
      lead,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const data =
      await getLeadsService(
        req.query
      );

    res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSingleLead =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const leadId =
        req.params.id as string;

      const lead =
        await getSingleLeadService(
          leadId
        );

      res.status(200).json({
        success: true,
        lead,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const updateLead = async (
  req: Request,
  res: Response
) => {
  try {
    const leadId =
      req.params.id as string;

    const lead =
      await updateLeadService(
        leadId,
        req.body
      );

    res.status(200).json({
      success: true,
      lead,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {
    const leadId =
      req.params.id as string;

    await deleteLeadService(
      leadId
    );

    res.status(200).json({
      success: true,
      message:
        "Lead Deleted Successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};