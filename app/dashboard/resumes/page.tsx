import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, FilePlus2 } from "lucide-react";

import { auth } from "@/auth";
import { getUserResumes } from "@/lib/services/resume.service";
import ResumeHistoryList from "@/components/resume/ResumeHistoryList";

export default async function ResumeHistoryPage() {

    const session = await auth();

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    const resumes = await getUserResumes(session.user.email);

    const analyzedResumes = resumes.filter(
        (resume) => resume.atsScore !== null
    );

    const averageATS =
        analyzedResumes.length === 0
            ? 0
            : Math.round(
                analyzedResumes.reduce(
                    (sum, resume) => sum + (resume.atsScore ?? 0),
                    0
                ) / analyzedResumes.length
            );

    return (
        <main className="mx-auto max-w-7xl p-10">

            {/* Header */}

            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">

                <div>

                    <Link
                        href="/dashboard"
                        className="mb-5 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>

                    <h1 className="text-4xl font-bold">
                        Resume History
                    </h1>

                    <p className="mt-2 text-gray-500">
                        View and manage your previous resume analyses.
                    </p>

                </div>

                <Link
                    href="/dashboard/resume"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
                >
                    <FilePlus2 size={18} />
                    Upload New Resume
                </Link>

            </div>

            {/* Statistics */}

            <div className="mb-10 grid gap-5 md:grid-cols-3">

                <div className="rounded-2xl border bg-white p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Total Resumes
                    </p>

                    <p className="mt-3 text-4xl font-bold">
                        {resumes.length}
                    </p>

                </div>

                <div className="rounded-2xl border bg-white p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Analyzed Resumes
                    </p>

                    <p className="mt-3 text-4xl font-bold">
                        {analyzedResumes.length}
                    </p>

                </div>

                <div className="rounded-2xl border bg-white p-6 shadow-sm">

                    <p className="text-sm text-gray-500">
                        Average ATS Score
                    </p>

                    <p className="mt-3 text-4xl font-bold">
                        {analyzedResumes.length > 0
                            ? `${averageATS}%`
                            : "--"}
                    </p>

                </div>

            </div>

            {/* Resume list */}

            <section>

                <h2 className="mb-6 text-2xl font-bold">
                    Your Uploaded Resumes
                </h2>

                <ResumeHistoryList resumes={resumes} />

            </section>

        </main>
    );
}