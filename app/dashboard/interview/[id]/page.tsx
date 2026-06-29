import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import InterviewPlayer from "@/components/interview/InterviewPlayer";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function InterviewPage({ params }: Props) {

    const { id } = await params;

    const interview = await prisma.interview.findUnique({
        where: {
            id,
        },
        include: {
            questions: {
                orderBy: {
                    createdAt: "asc",
                },
            },
        },
    });

    if (!interview) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-5xl p-10">
            <InterviewPlayer interview={interview} />
        </main>
    );
}