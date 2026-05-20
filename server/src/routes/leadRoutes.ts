import express from "express";

import {
  createLead,
  deleteLead,
  getLeads,
  updateLead,
} from "../controllers/leadController";

import { protect } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/roleMiddleware";

const router = express.Router();

router.get("/", protect, getLeads);

router.post(
  "/",
  protect,
  authorizeRoles("admin", "sales"),
  createLead
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateLead
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteLead
);

export default router;