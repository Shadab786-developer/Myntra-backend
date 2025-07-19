import { Router } from "express";
import {
  userLogin,
  userLogout,
  singIn,
  verifyEmail,
  register,
  registerLogin,
  registerLogout,
  verifyRegisterEmail,
} from "../controllers/login.controller.js";
import {
  verifyJWT,
  verifyRegisterJWT,
} from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/singin").post(singIn);
router.route("/login").post(verifyJWT, userLogin);
router.route("/logout").post(verifyJWT, userLogout);
router.route("/verify-email").post(verifyEmail);
router.route("/register").post(register);
router.route("/registerLogin").post(verifyRegisterJWT, registerLogin);
router.route("/registerLogout").post(verifyRegisterJWT, registerLogout);
router.route("/verifyRegisterEmail").post(verifyRegisterEmail);

export default router;
