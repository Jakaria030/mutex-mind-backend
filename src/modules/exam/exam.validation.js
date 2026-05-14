import { z } from "zod";

export const createExamSchema = z.object({
    subject: z.string().min(1, "Subject is required"),
    name: z.string().min(3, "Name must be at least 3 characters").max(100, "Name is too long"),
    description: z.string().max(500, "Description is too long").optional(),
    difficulty: z.enum(["easy", "medium", "hard"]).optional(),
    totalQuestions: z.number({ required_error: "Total questions is required" }).int("Must be an integer").min(1, "At least 1 question required"),
    duration: z.number({ required_error: "Duration is required" }).int("Must be an integer").min(1, "Duration must be at least 1 minute"),
});