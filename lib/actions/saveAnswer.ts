"use server";

import { prisma } from "@/lib/prisma";

export async function saveAnswer(
    questionId: string,
    answer: string
) {
    if (!questionId) return;

    await prisma.interviewQuestion.update({
        where: {
            id: questionId,
        },
        data: {
            answer,
        },
    });
}
