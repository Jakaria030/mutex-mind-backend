import { Router } from "express";
import validate from "../../middlewares/validate.middleware.js";
import { verifyAdmin, verifyToken } from "../../middlewares/auth.middleware.js";
import { createQuestion, deleteQuestion, getQuestionsByExam, updateQuestion } from "./question.controller.js";
import { createQuestionSchema, updateQuestionSchema } from "./question.validation.js";


const router = Router();

// Admin routes
router.post("/create", verifyToken, verifyAdmin, validate(createQuestionSchema), createQuestion);

router.get("/exam/:examId", verifyToken, verifyAdmin, getQuestionsByExam);

router.patch("/:id", verifyToken, verifyAdmin, validate(updateQuestionSchema), updateQuestion);

router.delete("/:id", verifyToken, verifyAdmin, deleteQuestion);


export default router;