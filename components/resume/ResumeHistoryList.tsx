import Link from "next/link";
import {
    FileText,
    CalendarDays,
    ArrowUpRight,
    Sparkles,
} from "lucide-react";

interface Resume {
    id: string;
    originalFileName: string | null;
    createdAt: Date;
    atsScore: number | null;
    jobMatchScore: number | null;
    shortlistChance: number | null;
    missingSkills: string[];
}

interface Props {
    resumes: Resume[];
}

export default function ResumeHistoryList({ resumes }: Props) {

    if (resumes.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed p-12 text-center">

                <FileText className="mx-auto h-12 w-12 text-gray-400" />

                <h2 className="mt-4 text-xl font-semibold">
                    No Resumes Yet
                </h2>

                <p className="mt-2 text-gray-500">
                    Upload your first resume to receive an AI-powered analysis.
                </p>

                <Link
                    href="/dashboard/resume"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800"
                >
                    Upload Resume
                    <ArrowUpRight size={18} />
                </Link>

            </div>
        );
    }

    return (
        <div className="space-y-5">

            {resumes.map((resume) => (

                <div
                    key={resume.id}
                    className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
                >

                    <div className="flex flex-col justify-between gap-5 md:flex-row">

                        {/* Resume information */}

                        <div className="flex gap-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                                <FileText className="h-6 w-6 text-blue-600" />
                            </div>

                            <div>

                                <h3 className="break-all text-lg font-semibold">
                                    {resume.originalFileName || "Uploaded Resume"}
                                </h3>

                                <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                                    <CalendarDays size={15} />

                                    {new Date(resume.createdAt).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">

                                    {resume.missingSkills.slice(0, 4).map((skill, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600"
                                        >
                                            {skill}
                                        </span>
                                    ))}

                                    {resume.missingSkills.length > 4 && (
                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                                            +{resume.missingSkills.length - 4} more
                                        </span>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Scores */}

                        <div className="flex flex-wrap items-center gap-6">

                            <div>
                                <p className="text-sm text-gray-500">
                                    ATS Score
                                </p>

                                <p className="mt-1 text-2xl font-bold">
                                    {resume.atsScore !== null
                                        ? `${resume.atsScore}/100`
                                        : "--"}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Job Match
                                </p>

                                <p className="mt-1 text-2xl font-bold">
                                    {resume.jobMatchScore !== null
                                        ? `${resume.jobMatchScore}/100`
                                        : "--"}
                                </p>
                            </div>

                            <Link
                                href={`/dashboard/resume/${resume.id}`}
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                            >
                                View Results
                                <ArrowUpRight size={18} />
                            </Link>

                        </div>

                    </div>

                    {resume.atsScore === null && (
                        <p className="mt-4 text-sm text-amber-600">
                            <Sparkles className="mr-1 inline h-4 w-4" />
                            Analysis pending
                        </p>
                    )}

                </div>

            ))}

        </div>
    );
}