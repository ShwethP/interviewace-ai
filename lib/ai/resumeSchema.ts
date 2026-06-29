import { z } from "zod";

export const ResumeSchema = z.object({
    atsScore: z.number(),

    strengths: z.array(z.string()),

    improvements: z.array(z.string()),

    missingSkills: z.array(z.string()),

    overallFeedback: z.string(),
});

export type ResumeResponse =
    z.infer<typeof ResumeSchema>;