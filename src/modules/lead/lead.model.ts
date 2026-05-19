import mongoose, {
  Schema,
  Document,
} from "mongoose";

import {
  LeadSource,
  LeadStatus,
} from "./lead.types";

export interface ILead
  extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  note?: string;
  status: LeadStatus;
  source: LeadSource;
}

const leadSchema =
  new Schema<ILead>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },

      phone: {
        type: String,
        default: "",
      },

      company: {
        type: String,
        default: "",
      },

      note: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: Object.values(
          LeadStatus
        ),
        default:
          LeadStatus.NEW,
      },

      source: {
        type: String,
        enum: Object.values(
          LeadSource
        ),
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const Lead =
  mongoose.model<ILead>(
    "Lead",
    leadSchema
  );