import { z } from "zod";

export const subjectSchema = z.object({
    name: z.string().min(2, "Subject name must be at least 2 characters").max(100, "Subject name is too long").trim(),
    slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens").trim(),
    category: z.string().min(2, "Category is too short").max(50, "Category is too long").optional(),
});
