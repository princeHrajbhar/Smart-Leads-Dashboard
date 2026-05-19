import {
  Request,
  Response,
} from "express";

import { Parser } from "json2csv";
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


// lead.controller.ts



import { Lead } from "./lead.model";

export const exportLeadsCSV = async (
  req: Request,
  res: Response
) => {
  try {
    const leads = await Lead.find(
      {},
      {
        name: 1,
        email: 1,
        phone: 1,
        company: 1,
        note: 1,
        status: 1,
        source: 1,
        _id: 0,
      }
    ).lean();

    const parser = new Parser();

    const csv = parser.parse(
      leads
    );

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment(
      "leads.csv"
    );

    return res.send(csv);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to export leads",
    });
  }
};