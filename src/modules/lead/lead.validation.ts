import { z } from "zod";

export const createLeadSchema =
  z.object({
    name: z
      .string()
      .min(2),

    email: z
      .string()
      .email(),

    phone: z
      .string()
      .optional(),

    company: z
      .string()
      .optional(),

    note: z
      .string()
      .optional(),

    status: z
      .enum([
        "NEW",
        "CONTACTED",
        "QUALIFIED",
        "LOST",
      ])
      .optional(),

    source: z.enum([
      "WEBSITE",
      "INSTAGRAM",
      "REFERRAL",
    ]),
  });