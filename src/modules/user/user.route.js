import { Router } from "express";
import { changePasswordSchema, loginSchema, registerUserSchema, updateProfileSchema } from "./user.validation.js";
import validate from "../../middlewares/validate.middleware.js";
import { changePassword, getAllUser, getProfile, login, logout, refreshAccessToken, register, toggleUserStatus, updateProfile } from "./user.controller.js";
import { verifyAdmin, verifyToken } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerUserSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", verifyToken, logout);
router.post("/refresh-token", refreshAccessToken);

router.get("/profile", verifyToken, getProfile);

router.patch("/profile", verifyToken, validate(updateProfileSchema), updateProfile);
router.patch("/change-password", verifyToken, validate(changePasswordSchema), changePassword);

// For admin only
router.get("/", verifyToken, verifyAdmin, getAllUser);
router.patch("/toggle-status/:userId", verifyToken, verifyAdmin, toggleUserStatus);

export default router;