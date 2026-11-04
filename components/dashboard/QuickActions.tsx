import Link from "next/link";
import { ArrowRight, FileText, Mic } from "lucide-react";

export default function QuickActions() {

    return (
        <div className="grid w-full gap-6 md:grid-cols-2">

            {/* Interviews */}

            <Link
                href="/dashboard/interviews"
                className="group flex min-h-64 flex-col justify-between rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >

                <div>

                    <Mic className="mb-6 h-10 w-10" />

                    <h2 className="text-2xl font-bold">
                        Interviews
                    </h2>

                    <p className="mt-3 max-w-sm text-blue-100">
                        Practice AI-powered mock interviews, continue unfinished sessions, and review your previous results.
                    </p>

                </div>

                <div className="mt-8 flex items-center gap-2 font-semibold">
                    View Interviews
                    <ArrowRight className="transition group-hover:translate-x-2" />
                </div>

            </Link>

            {/* Resumes */}

            <Link
                href="/dashboard/resumes"
                className="group flex min-h-64 flex-col justify-between rounded-3xl border bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >

                <div>

                    <FileText className="mb-6 h-10 w-10 text-emerald-600" />

                    <h2 className="text-2xl font-bold">
                        Resumes
                    </h2>

                    <p className="mt-3 max-w-sm text-gray-500">
                        Upload your resume, analyze ATS compatibility, check job matches, and review previous reports.
                    </p>

                </div>

                <div className="mt-8 flex items-center gap-2 font-semibold text-emerald-600">
                    View Resumes
                    <ArrowRight className="transition group-hover:translate-x-2" />
                </div>

            </Link>

        </div>
    );
}