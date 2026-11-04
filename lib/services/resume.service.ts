import { prisma } from "@/lib/prisma";

export async function getUserResumes(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            resumes: {
                orderBy: {
                    createdAt: "desc",
                },
                select: {
                    id: true,
                    originalFileName: true,
                    createdAt: true,
                    atsScore: true,
                    jobMatchScore: true,
                    shortlistChance: true,
                    missingSkills: true,
                },
            },
        },
    });

    return user?.resumes ?? [];
}