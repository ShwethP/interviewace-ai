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
        resume.atsScore === null
    ) {
        await evaluateResume(resume.id);

        redirect(`/dashboard/resume/${resume.id}`);
    }

    return (
        <main className="mx-auto max-w-7xl p-10">

            <div className="mb-10">
                <h1 className="text-4xl font-bold">
                    Resume Intelligence Report
                </h1>

                <p className="mt-2 text-gray-500">
                    AI-powered ATS review and interview preparation.
                </p>
            </div>

            <div className="mb-8 rounded-2xl border-l-8 border-blue-600 bg-blue-50 p-8">

                <h2 className="text-2xl font-bold">
                    👨‍💼 Recruiter Verdict
                </h2>

                <p className="mt-5 leading-8">
                    {resume.recruiterSummary}
                </p>

            </div>

            {/* Scores */}

            <div className="grid gap-6 md:grid-cols-2">

                <div className="rounded-2xl border bg-white p-8 shadow-sm">

                    <p className="text-gray-500">
                        ATS Score
                    </p>

                    <div className="mt-3 flex items-end gap-2">

                        <span className="text-6xl font-bold">
                            {resume.atsScore}
                        </span>

                        <span className="pb-2 text-2xl text-gray-500">
                            /100
                        </span>

                    </div>

                </div>

                <div className="rounded-2xl border bg-white p-8 shadow-sm">

                    <p className="text-gray-500">
                        Job Match
                    </p>

                    <div className="mt-3 flex items-end gap-2">

                        <span
                            className={
                                (resume.jobMatchScore ?? 0) >= 80
                                    ? "text-green-600"
                                    : (resume.jobMatchScore ?? 0) >= 60
                                        ? "text-yellow-500"
                                        : "text-red-500"
                            }
                        >
                            {resume.jobMatchScore ?? "--"}
                        </span>

                        <span className="pb-2 text-2xl text-gray-500">
                            /100
                        </span>

                    </div>

                </div>

            </div>

            <div className="rounded-2xl border bg-white p-8 shadow-sm">

                <p className="text-gray-500">
                    Shortlist Chance
                </p>

                <div className="mt-3 flex items-end gap-2">

                    <span className="text-6xl font-bold text-blue-600">
                        {resume.shortlistChance}
                    </span>

                    <span className="pb-2 text-2xl">
                        %
                    </span>

                </div>

            </div>

            {/* Strengths + Improvements */}

            <div className="mt-8 grid gap-6 lg:grid-cols-2">

                <div className="rounded-2xl border bg-white p-8 shadow-sm">

                    <h2 className="text-2xl font-bold text-green-600">
                        💪 Strengths
                    </h2>

                    <ul className="mt-6 space-y-4">

                        {resume.strengths.map((item, index) => (

                            <li
                                key={index}
                                className="rounded-lg bg-green-50 p-4"
                            >
                                {item}
                            </li>

                        ))}

                    </ul>

                </div>

                <div className="rounded-2xl border bg-white p-8 shadow-sm">

                    <h2 className="text-2xl font-bold text-orange-500">
                        🚀 Improvements
                    </h2>

                    <ul className="mt-6 space-y-4">

                        {resume.improvements.map((item, index) => (

                            <li
                                key={index}
                                className="rounded-lg bg-orange-50 p-4"
                            >
                                {item}
                            </li>

                        ))}

                    </ul>

                </div>

            </div>

            {/* Missing Skills */}

            <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">

                <h2 className="text-2xl font-bold text-red-600">
                    Missing Skills
                </h2>

                <div className="mt-6 flex flex-wrap gap-3">

                    {resume.missingSkills.map((skill, index) => (

                        <span
                            key={index}
                            className="rounded-full bg-red-100 px-4 py-2 font-medium text-red-700"
                        >
                            {skill}
                        </span>

                    ))}

                </div>

            </div>

            {/* Interview Preparation */}

            <div className="mt-8 grid gap-6 lg:grid-cols-2">

                <div className="rounded-2xl border bg-white p-8 shadow-sm">

                    <h2 className="text-2xl font-bold">
                        📚 Interview Preparation
                    </h2>

                    <ul className="mt-6 space-y-3">

                        {(resume.interviewPreparation ?? []).map((item, index) => (

                            <li key={index}>
                                • {item}
                            </li>

                        ))}

                    </ul>

                </div>

                <div className="rounded-2xl border bg-white p-8 shadow-sm">

                    <h2 className="text-2xl font-bold">
                        🎯 Likely Interview Questions
                    </h2>

                    <ul className="mt-6 space-y-3">

                        {(resume.likelyQuestions ?? []).map((item, index) => (

                            <li key={index}>
                                • {item}
                            </li>

                        ))}

                    </ul>

                </div>

            </div>
            {resume.jobDescription && (
                <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">

                    <h2 className="text-2xl font-bold">
                        Job Description
                    </h2>

                    <div className="mt-6 max-h-80 overflow-y-auto rounded-xl bg-gray-50 p-5 whitespace-pre-wrap text-gray-700">
                        {resume.jobDescription}
                    </div>

                </div>
            )}

            {/* Resume */}

            <div className="mt-8 rounded-2xl border bg-white p-8 shadow-sm">

                <h2 className="text-2xl font-bold">
                    Uploaded Resume
                </h2>

                <a
                    href={resume.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
                >
                    View Resume
                </a>

            </div>

        </main>
    );
}