import { Router } from "express";
import validate from "../../middlewares/validate.middleware.js";
import { verifyAdmin, verifyToken } from "../../middlewares/auth.middleware.js";
import { createExam, getAllExams, togglePublishExam, updateExam } from "./exam.controller.js";
import { examSchema } from "./exam.validation.js";


const router = Router();

// ========== Only For Admin ==========
router.post("/", verifyToken, verifyAdmin, validate(examSchema), createExam);
router.get("/", verifyToken, verifyAdmin, getAllExams);
router.patch("/publish/:id", verifyToken, verifyAdmin, togglePublishExam);
router.patch("/:id", verifyToken, verifyAdmin,  updateExam);

// ========== Only For Authenticate User ==========






export default router;