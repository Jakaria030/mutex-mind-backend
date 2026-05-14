import { Router } from "express";
import validate from "../../middlewares/validate.middleware.js";
import { verifyToken, verifyAdmin } from "../../middlewares/auth.middleware.js";
import { subjectSchema } from "./subject.validation.js";
import { createSubject, updateSubject } from "./subject.controller.js";

const router = Router();

// Admin routes
router.post("/create", verifyToken, verifyAdmin, validate(subjectSchema), createSubject);
router.patch("/update/:id", verifyToken, verifyAdmin, validate(subjectSchema), updateSubject);

export default router;