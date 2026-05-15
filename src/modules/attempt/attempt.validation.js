import { z } from "zod";

const optionSchema = z.object({
    text: z.string().min(1),
    isCorrect: z.boolean(),
    isSelected: z.boolean(),
});

const answerSchema = z.object({
    question: z.string().min(1),
    options: z.array(optionSchema).min(1),
});

export const createAttemptSchema = z.object({
    exam: z.string().min(1, "Exam id is required"),
    timeTaken: z.number().optional(),
    answers: z.array(answerSchema).min(1, "Answers required"),
});