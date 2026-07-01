import { z } from "zod";

export const ResumeSchema = z.object({

    atsScore: z.number(),

    jobMatchScore: z.number(),

    shortlistChance: z.number(),

    strengths: z.array(z.string()),

    improvements: z.array(z.string()),

    missingSkills: z.array(z.string()),

    interviewPreparation: z.array(z.string()),

    likelyQuestions: z.array(z.string()),

    recruiterSummary: z.string(),


});

export type ResumeResponse =
    z.infer<typeof ResumeSchema>;