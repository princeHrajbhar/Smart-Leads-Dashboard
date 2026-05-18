import { z } from "zod";

export const createLeadSchema =
  z.object({
    name: z.string(),

    email: z.string().email(),

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