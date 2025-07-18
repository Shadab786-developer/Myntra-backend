import { Router } from "express";
import {
  addProduct,
  getProductById,
  getProductList,
  getProductsWithOutPageLimit,
} from "../controllers/productList.controller.js";

const router = Router();

router.route("/createProduct").post(addProduct);
router.route("/getProducts").get(getProductList);
router.route("/getProduct/:id").get(getProductById);
router.route("/getProductsWithOutPageLimit").get(getProductsWithOutPageLimit);

export default router;
