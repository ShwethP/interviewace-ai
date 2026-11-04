import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import InterviewCard from "@/components/dashboard/InterviewCard";

export default async function InterviewsPage() {

    const session = await auth();

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
        select: {
            interviews: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!user) {
        return <div className="p-10">User not found</div>;
    }

    const interviews = user.interviews;

    return (
        <main className="mx-auto max-w-6xl p-10">

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
                        My Interviews
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your interview practice sessions and review your results.
                    </p>

                </div>

                <Link
                    href="/dashboard/new"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                    <Plus size={18} />
                    Start New Interview
                </Link>

            </div>

            {/* Interview statistics */}

            <div className="mb-8 grid gap-5 sm:grid-cols-3">

                <div className="rounded-2xl border bg-white p-6">
                    <p className="text-sm text-gray-500">
                        Total Interviews
                    </p>
                    <p className="mt-2 text-3xl font-bold">
                        {interviews.length}
                    </p>
                </div>

                <div className="rounded-2xl border bg-white p-6">
                    <p className="text-sm text-gray-500">
                        Completed
                    </p>
                    <p className="mt-2 text-3xl font-bold text-green-600">
                        {interviews.filter(i => i.status === "COMPLETED").length}
                    </p>
                </div>

                <div className="rounded-2xl border bg-white p-6">
                    <p className="text-sm text-gray-500">
                        In Progress / Upcoming
                    </p>
                    <p className="mt-2 text-3xl font-bold text-amber-500">
                        {interviews.filter(i => i.status !== "COMPLETED").length}
                    </p>
                </div>

            </div>

            {/* Interview history */}

            <section>

                <h2 className="mb-5 text-2xl font-bold">
                    Interview History
                </h2>

                {interviews.length === 0 ? (

                    <div className="rounded-2xl border border-dashed p-12 text-center">

                        <h3 className="text-xl font-semibold">
                            No Interviews Yet
                        </h3>

                        <p className="mt-2 text-gray-500">
                            Start your first AI-powered mock interview.
                        </p>

                        <Link
                            href="/dashboard/new"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                        >
                            <Plus size={18} />
                            Start Interview
                        </Link>

                    </div>

                ) : (

                    <div className="space-y-5">

                        {interviews.map((interview) => (
                            <InterviewCard
                                key={interview.id}
                                interview={interview}
                            />
                        ))}

                    </div>

                )}

            </section>

        </main>
    );
}