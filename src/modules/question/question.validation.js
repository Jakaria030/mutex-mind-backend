import { z } from "zod";

const optionSchema = z.object({
    text: z.string().trim().min(1, "Option text is required"),
    isCorrect: z.boolean(),
});

const optionUpdateSchema = z.object({
    text: z.string().trim().min(1).optional(),
    isCorrect: z.boolean().optional(),
});

export const createQuestionSchema = z.object({
    exam: z.string().min(1, "Exam id is required"),
    questions: z.array(
        z.object({
            question: z.string().trim().min(5, "Question is required"),
            options: z.array(optionSchema).min(2, "At least 2 options required"),
        })
    ).min(1, "At least one question required"),
});

export const updateQuestionSchema = z.object({
    question: z.string().trim().min(5).optional(),
    options: z.array(optionUpdateSchema).min(2).optional(),
});