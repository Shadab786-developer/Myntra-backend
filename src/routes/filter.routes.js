import { Router } from "express";
import {
  filterByCategory,
  filterByCurrentPrice,
  filterByCompanyName,
  filterByDiscount,
  filterByColor,
} from "../controllers/filters.controller.js";

const router = Router();

router.route("/filterByCategory").post(filterByCategory);
router.route("/filterByCurrentPrice").post(filterByCurrentPrice);
router.route("/filterByCompanyName").post(filterByCompanyName);
router.route("/filterByDiscount").post(filterByDiscount);
router.route("/filterByColor").post(filterByColor);

export default router;
