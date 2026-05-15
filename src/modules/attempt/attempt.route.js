import { Router } from "express";
import validate from "../../middlewares/validate.middleware.js";
import { verifyAdmin, verifyToken } from "../../middlewares/auth.middleware.js";
import { createAttempt } from "./attempt.controller.js";
import { createAttemptSchema } from "./attempt.validation.js";


const router = Router();

router.post("/", verifyToken, validate(createAttemptSchema), createAttempt);

export default router;