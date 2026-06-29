import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { evaluateResume } from "@/lib/actions/evaluateResume";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function ResumePage({
    params,
}: Props) {

    const { id } = await params;

    const resume = await prisma.resume.findUnique({
        where: {
            id,
        },
    });

    if (!resume) {
        return (
            <main className="mx-auto max-w-5xl p-10">
                <h1 className="text-2xl font-bold">
                    Resume not found
                </h1>
            </main>
        );
    }

    // Run AI analysis only once
    if (
        resume.atsScore === null ||
        resume.overallFeedback === null
    ) {
        await evaluateResume(resume.id);

        redirect(`/dashboard/resume/${resume.id}`);
    }

    return (
        <main className="mx-auto max-w-5xl p-10">

            <h1 className="text-3xl font-bold">
                Resume Analysis
            </h1>

            <div className="mt-10 rounded-lg border p-8">

                <h2 className="text-2xl font-bold">
                    ATS Score
                </h2>

                <div className="mt-6 flex items-end gap-2">

                    <span className="text-7xl font-bold">
                        {resume.atsScore}
                    </span>

                    <span className="pb-2 text-3xl text-gray-500">
                        /100
                    </span>

                </div>

            </div>

            <div className="mt-8 rounded-lg border p-8">

                <h2 className="text-2xl font-bold">
                    AI Feedback
                </h2>

                <p className="mt-6 whitespace-pre-wrap">
                    {resume.overallFeedback}
                </p>

            </div>
            <div className="mt-8 rounded-lg border p-8">

                <h2 className="text-2xl font-bold">
                    Strengths
                </h2>

                <ul className="mt-6 list-disc space-y-3 pl-6">

                    {resume.strengths.map((item: any, index: any) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}

                </ul>

            </div>
            <div className="mt-8 rounded-lg border p-8">

                <h2 className="text-2xl font-bold">
                    Improvements
                </h2>

                <ul className="mt-6 list-disc space-y-3 pl-6">

                    {resume.improvements.map((item: any, index: any) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}

                </ul>

            </div>
            <div className="mt-8 rounded-lg border p-8">

                <h2 className="text-2xl font-bold">
                    Missing Skills
                </h2>

                <ul className="mt-6 list-disc space-y-3 pl-6">

                    {resume.missingSkills.map((item: any, index: any) => (
                        <li key={index}>
                            {item}
                        </li>
                    ))}

                </ul>

            </div>
            <div className="mt-8 rounded-lg border p-8">

                <h2 className="text-2xl font-bold">
                    Uploaded Resume
                </h2>

                <a
                    href={resume.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block rounded bg-black px-6 py-3 text-white"
                >
                    View Resume
                </a>

            </div>

        </main>
    );
}