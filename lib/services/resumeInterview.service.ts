import { prisma } from "@/lib/prisma";
import { generateResumeQuestions } from "@/lib/ai/generateQuestions";

export async function createResumeInterviewService(
    resumeId: string,
    email: string
) {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const resume = await prisma.resume.findFirst({
        where: {
            id: resumeId,
            userId: user.id,
        },
    });

    if (!resume) {
        throw new Error("Resume not found");
    }

    if (!resume.extractedText) {
        throw new Error("Resume analysis is not complete");
    }

    // Generate questions using resume and optional JD
    const aiResponse = await generateResumeQuestions({
        resumeText: resume.extractedText,
        jobDescription: resume.jobDescription,
        strengths: resume.strengths,
        improvements: resume.improvements,
        missingSkills: resume.missingSkills,
        interviewPreparation: resume.interviewPreparation,
        likelyQuestions: resume.likelyQuestions,
    });

    // Create interview after successful question generation
    const interview = await prisma.interview.create({
        data: {
            company: "Personalized AI",
            role: "Resume-Based Interview",
            experience: 0,
            difficulty: "Medium",
            interviewType: "Technical",
            techStack: resume.strengths.join(", "),
            userId: user.id,
            resumeId: resume.id,

            questions: {
                create: aiResponse.questions.map((q) => ({
                    question: q.question,
                    category: q.category,
                    difficulty: q.difficulty,
                })),
            },
        },
    });

    return interview;
}