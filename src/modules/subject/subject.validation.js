import { z } from "zod";

export const subjectSchema = z.object({
    name: z.string().min(2, "Subject name must be at least 2 characters").max(100, "Subject name is too long").trim(),
    slug: z.string().min(2, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens").trim(),
    category: z.string().min(2, "Category is too short").max(50, "Category is too long").trim(),
    categoryColor: z.string().min(4, "Category color is too short").max(7, "Category color is too long").trim(),
    iconName: z.string().trim()
});
