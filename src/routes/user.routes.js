import { Router } from "express";
import {
  userLogin,
  userLogout,
  singIn,
  verifyEmail,
} from "../controllers/login.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/singin").post(singIn);
router.route("/login").post(verifyJWT, userLogin);
router.route("/logout").post(verifyJWT, userLogout);
router.route("/verify-email").post(verifyEmail);

export default router;
