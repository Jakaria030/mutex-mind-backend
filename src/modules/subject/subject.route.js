import { Router } from "express";
import validate from "../../middlewares/validate.middleware.js";
import { verifyToken, verifyAdmin } from "../../middlewares/auth.middleware.js";
import { subjectSchema } from "./subject.validation.js";
import { createSubject, getAllSubjects, publishSubject, updateSubject } from "./subject.controller.js";

const router = Router();

// ========== Only For Admin ==========
router.get("/", verifyToken, verifyAdmin, getAllSubjects);
router.post("/", verifyToken, verifyAdmin, validate(subjectSchema), createSubject);
router.patch("/:id", verifyToken, verifyAdmin, validate(subjectSchema), updateSubject);
router.patch("/publish/:id", verifyToken, verifyAdmin, publishSubject);

export default router;