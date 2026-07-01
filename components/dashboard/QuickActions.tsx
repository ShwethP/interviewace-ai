import Link from "next/link";
import { ArrowRight, FileText, Mic } from "lucide-react";

export default function QuickActions() {
    return (
        <div className="grid gap-6 md:grid-cols-2">

            <Link
                href="/dashboard/new"
                className="group rounded-3xl border bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >
                <Mic className="mb-6 h-10 w-10" />

                <h2 className="text-2xl font-bold">
                    Start Interview
                </h2>

                <p className="mt-2 text-blue-100">
                    Practice AI-powered mock interviews tailored to your role.
                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold">
                    Start now
                    <ArrowRight className="transition group-hover:translate-x-2" />
                </div>

            </Link>

            <Link
                href="/dashboard/resume"
                className="group rounded-3xl border bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
            >
                <FileText className="mb-6 h-10 w-10 text-emerald-600" />

                <h2 className="text-2xl font-bold">
                    Resume Analyzer
                </h2>

                <p className="mt-2 text-gray-500">
                    Analyze ATS score, improve your resume, and check job fit.
                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-emerald-600">
                    Analyze Resume
                    <ArrowRight className="transition group-hover:translate-x-2" />
                </div>

            </Link>

        </div>
    );
}