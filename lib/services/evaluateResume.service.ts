import { prisma } from "@/lib/prisma";

import { extractResumeText } from "@/lib/resume/extractText";
import { evaluateResume } from "@/lib/ai/evaluateResume";

export async function evaluateResumeService(
    resumeId: string
) {

    const resume = await prisma.resume.findUnique({
        where: {
            id: resumeId,
        },
    });

    if (!resume) {
        throw new Error("Resume not found");
    }

    const text = await extractResumeText(
        resume.fileUrl
    );

    const result = await evaluateResume(
        text,
        resume.jobDescription ?? undefined
    );
    console.log('result to database*****************', result);

    try {
        await prisma.resume.update({
            where: {
                id: resumeId,
            },
            data: {
                extractedText: text,

                atsScore: result.atsScore ?? 0,
                jobMatchScore: result.jobMatchScore ?? 0,
                shortlistChance:
                    result.shortlistChance,

                recruiterSummary:
                    result.recruiterSummary,
                strengths: result.strengths ?? [],
                improvements: result.improvements ?? [],
                missingSkills: result.missingSkills ?? [],

                interviewPreparation: result.interviewPreparation ?? [],
                likelyQuestions: result.likelyQuestions ?? [],

            },
        });
    } catch (e) {
        console.error("PRISMA ERROR:");
        console.dir(e, { depth: null });
        throw e;
    }
}