import { prisma } from "./prisma";

export async function getDashboardStats(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
        include: {
            resumes: true,
            interviews: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!user) return null;

    const completedInterviews = user.interviews.filter(
        (i: any) => i.overallScore !== null
    );

    const averageInterviewScore =
        completedInterviews.length === 0
            ? 0
            : Math.round(
                completedInterviews.reduce(
                    (sum: any, i: any) => sum + (i.overallScore ?? 0),
                    0
                ) / completedInterviews.length
            );

    const bestInterviewScore =
        completedInterviews.length === 0
            ? 0
            : Math.max(
                ...completedInterviews.map(
                    (i: any) => i.overallScore ?? 0
                )
            );

    const analyzedResumes = user.resumes.filter(
        (r: any) => r.atsScore !== null
    );

    const averageResumeScore =
        analyzedResumes.length === 0
            ? 0
            : Math.round(
                analyzedResumes.reduce(
                    (sum: any, r: any) => sum + (r.atsScore ?? 0),
                    0
                ) / analyzedResumes.length
            );

    return {
        user,
        interviews: user.interviews,
        totalInterviews: user.interviews.length,
        totalResumes: user.resumes.length,
        averageInterviewScore,
        bestInterviewScore,
        averageResumeScore,
    };
}