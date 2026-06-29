import { auth } from "@/auth";
import { redirect } from "next/navigation";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import StartInterviewButton from "@/components/dashboard/StartInterviewButton";
import { getDashboardStats } from "@/lib/dashboard";
import InterviewCard from "@/components/dashboard/InterviewCard";
import ResumeButton from "@/components/dashboard/ResumeButton";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/api/auth/signin");
    }

    const data = await getDashboardStats(session.user.email);

    if (!data) {
        return <h1>User not found</h1>;
    }

    return (
        <main className="mx-auto max-w-6xl p-10">
            <DashboardHeader
                name={data.user.name ?? "User"}
                image={data.user.image}
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
                <StatsCard
                    title="Interviews"
                    value={data.totalInterviews}
                />

                <StatsCard
                    title="Resumes"
                    value={data.totalResumes}
                />

                <StatsCard
                    title="Avg Interview"
                    value={`${data.averageInterviewScore}%`}
                />

                <StatsCard
                    title="Best Score"
                    value={`${data.bestInterviewScore}%`}
                />

                <StatsCard
                    title="Avg ATS"
                    value={`${data.averageResumeScore}%`}
                />

                <StatsCard
                    title="AI Credits"
                    value={25}
                />
            </div>
            <div className="mt-10 flex gap-4">

                <StartInterviewButton />

                <ResumeButton />

            </div>
            <section className="mt-12">

                <h2 className="mb-6 text-2xl font-bold">
                    My Interviews
                </h2>

                {data.interviews.length === 0 ? (

                    <div className="rounded-xl border border-dashed p-12 text-center">

                        <h3 className="text-xl font-semibold">
                            No Interviews Yet
                        </h3>

                        <p className="mt-2 text-gray-500">
                            Click `Start Interview` to generate your first AI interview.
                        </p>

                    </div>

                ) : (

                    <div className="max-h-[550px] space-y-5 overflow-y-auto pr-2">

                        {data.interviews.map((interview: any) => (

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