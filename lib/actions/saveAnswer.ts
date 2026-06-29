"use server";

import { prisma } from "@/lib/prisma";

export async function saveAnswer(
    questionId: string,
    answer: string
) {
    await prisma.interviewQuestion.update({
        where: {
            id: questionId,
        },
        data: {
            answer,
        },
    });
}