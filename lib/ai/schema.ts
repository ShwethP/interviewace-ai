import { z } from "zod";

export const InterviewQuestionSchema = z.object({
    question: z.string(),
    category: z.string(),
    difficulty: z.string(),
});

export const InterviewResponseSchema = z.object({
    questions: z.array(InterviewQuestionSchema),
});

export type InterviewResponse =
    z.infer<typeof InterviewResponseSchema>;