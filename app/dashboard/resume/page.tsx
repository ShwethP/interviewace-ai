import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ResumeUploadForm from "@/components/resume/ResumeUploadForm";

export default function ResumePage() {
    return (
        <main className="mx-auto max-w-3xl p-10">
            <Link
                href="/dashboard"
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold">
                Resume Analyzer
            </h1>

            <p className="mt-2 text-gray-500">
                Upload your resume to receive an AI-powered ATS review.
            </p>

            <ResumeUploadForm />

        </main>
    );
}