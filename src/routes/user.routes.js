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
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/singin").post(singIn);
router.route("/login").post(verifyJWT, userLogin);
router.route("/logout").post(verifyJWT, userLogout);
router.route("/verify-email").post(verifyEmail);
router.route("/register").post(register);
router.route("/registerLogin").post(verifyJWT, registerLogin);
router.route("/registerLogout").post(verifyJWT, registerLogout);
router.route("/verifyRegisterEmail").post(verifyRegisterEmail);

export default router;
