import { prisma } from "@/lib/prisma";
import { generateQuestions } from "@/lib/ai/generateQuestions";

export async function createInterviewService(
    formData: FormData,
    email: string
) {

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const company = formData.get("company") as string;

    const role = formData.get("role") as string;

    const experience = Number(
        formData.get("experience")
    );

    const difficulty =
        formData.get("difficulty") as string;

    const interviewType =
        formData.get("interviewType") as string;

    const techStack =
        formData.get("techStack") as string;

    const interview =
        await prisma.interview.create({
            data: {
                company,
                role,
                experience,
                difficulty,
                interviewType,
                techStack,
                userId: user.id,
            },
        });

    const aiResponse =
        await generateQuestions({
            company,
            role,
            experience,
            difficulty,
            interviewType,
            techStack,
        });

    await prisma.interviewQuestion.createMany({
        data: aiResponse.questions.map((q) => ({
            interviewId: interview.id,
            question: q.question,
            category: q.category,
            difficulty: q.difficulty,
        })),
    });

    return interview;
}