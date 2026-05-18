import { Router } from "express";

import {
  createLead,
  deleteLead,
  getLeads,
  getSingleLead,
  updateLead,
} from "./lead.controller";

import { protect } from "../../middlewares/auth.middleware";

import { authorize } from "../../middlewares/role.middleware";

const router = Router();

router.use(protect);

router.post(
  "/",
  authorize("ADMIN", "SALES"),
  createLead
);

router.get(
  "/",
  authorize("ADMIN", "SALES"),
  getLeads
);

router.get(
  "/:id",
  authorize("ADMIN", "SALES"),
  getSingleLead
);

router.put(
  "/:id",
  authorize("ADMIN", "SALES"),
  updateLead
);

router.delete(
  "/:id",
  authorize("ADMIN"),
  deleteLead
);

export default router;