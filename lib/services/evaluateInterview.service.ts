import { prisma } from "@/lib/prisma";
import { evaluateInterview } from "@/lib/ai/evaluateInterview";

export async function evaluateInterviewService(
    interviewId: string
) {

    const interview = await prisma.interview.findUnique({
        where: {
            id: interviewId,
        },
        include: {
            questions: true,
        },
    });

    if (!interview) {
        throw new Error("Interview not found");
    }

    const aiResponse = await evaluateInterview({
        company: interview.company,
        role: interview.role,
        difficulty: interview.difficulty,
        interviewType: interview.interviewType,
        questions: interview.questions.map((q) => ({
            id: q.id,
            question: q.question,
            answer: q.answer ?? "",
        })),
    });

    for (const result of aiResponse.questions) {

        await prisma.interviewQuestion.update({
            where: {
                id: result.questionId,
            },
            data: {
                score: result.score,
                feedback: result.feedback,
                idealAnswer: result.idealAnswer,
            },
        });

    }

    await prisma.interview.update({
        where: {
            id: interview.id,
        },
        data: {
            overallScore: aiResponse.overallScore,
            overallFeedback: aiResponse.overallFeedback,
            status: "COMPLETED",
        },
    });

    return interview.id;
}