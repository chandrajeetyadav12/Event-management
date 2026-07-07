import { Router } from "express";

import {
  login,
  register,
  getProfile,
  logout,
  resetPasswordController,
  forgotPasswordController
} from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);

router.post("/login", login);
router.get("/profile", protect, getProfile);
router.post("/logout", logout);
router.post(
  "/forgot-password",
  forgotPasswordController
);

router.post(
  "/reset-password/:token",
  resetPasswordController
);

export default router;