import { Router } from "express";
import {
  filterByCategory,
  filterByCurrentPrice,
  filterByCompanyName,
  filterByDiscount,
  filterByColor,
} from "../controllers/filters.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/filterByCategory").post(verifyJWT, filterByCategory);
router.route("/filterByCurrentPrice").post(verifyJWT, filterByCurrentPrice);
router.route("/filterByCompanyName").post(verifyJWT, filterByCompanyName);
router.route("/filterByDiscount").post(verifyJWT, filterByDiscount);
router.route("/filterByColor").post(verifyJWT, filterByColor);

export default router;
