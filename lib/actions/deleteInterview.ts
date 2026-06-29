"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteInterview(
    interviewId: string
) {

    const session = await auth();

    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const interview = await prisma.interview.findFirst({
        where: {
            id: interviewId,
            userId: user.id,
        },
    });

    if (!interview) {
        throw new Error("Interview not found");
    }

    await prisma.interview.delete({
        where: {
            id: interviewId,
        },
    });

    revalidatePath("/dashboard");
}