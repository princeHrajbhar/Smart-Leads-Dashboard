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
import {
  exportLeadsCSV,
} from "./lead.controller";

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

// lead.routes.ts
router.get(
  "/export/csv",
  exportLeadsCSV
);

export default router;