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

    const result = await evaluateResume(text);
    console.log('result to database*****************', result);

    try {
        await prisma.resume.update({
            where: {
                id: resumeId,
            },
            data: {
                extractedText: text,
                atsScore: result.atsScore,
                strengths: result.strengths,
                improvements: result.improvements,
                missingSkills: result.missingSkills,
                overallFeedback: result.overallFeedback,
            },
        });
    } catch (e) {
        console.error("PRISMA ERROR:");
        console.dir(e, { depth: null });
        throw e;
    }
}