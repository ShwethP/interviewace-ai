import { z } from "zod";

export const EvaluationResponseSchema = z.object({
    overallScore: z.number(),

    overallFeedback: z.string(),

    questions: z.array(
        z.object({
            questionId: z.string(),

            score: z.number(),

            feedback: z.string(),

            idealAnswer: z.string(),
        })
    ),
});

export type EvaluationResponse =
    z.infer<typeof EvaluationResponseSchema>;