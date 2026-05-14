import { Router } from "express";
import validate from "../../middlewares/validate.middleware.js";
import { verifyAdmin, verifyToken } from "../../middlewares/auth.middleware.js";
import { createExam, getAllExams, togglePublishExam } from "./exam.controller.js";
import { createExamSchema } from "./exam.validation.js";


const router = Router();

// Admin routes
router.post("/create", verifyToken, verifyAdmin, validate(createExamSchema), createExam);

router.get("/get", verifyToken, getAllExams);

router.patch("/publish/:id", verifyToken, verifyAdmin, togglePublishExam);

export default router;