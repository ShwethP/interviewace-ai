import { auth } from "@/auth";
import { redirect } from "next/navigation";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import { getDashboardStats } from "@/lib/dashboard";
import InterviewCard from "@/components/dashboard/InterviewCard";
import QuickActions from "@/components/dashboard/QuickActions";
import {
    BriefcaseBusiness,
    FileText,
    Trophy,
    Target,
    Sparkles,
    Brain,
} from "lucide-react";

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
                interviews={data.totalInterviews}
                resumes={data.totalResumes}
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
                <StatsCard
                    title="Interviews"
                    value={data.totalInterviews}
                    subtitle="Completed & Upcoming"
                    icon={<BriefcaseBusiness size={28} />}
                />

                <StatsCard
                    title="Resumes"
                    value={data.totalResumes}
                    subtitle="Uploaded"
                    icon={<FileText size={28} />}
                />

                <StatsCard
                    title="Avg Interview"
                    value={`${data.averageInterviewScore}%`}
                    subtitle="Performance"
                    icon={<Brain size={28} />}
                />

                <StatsCard
                    title="Best Score"
                    value={`${data.bestInterviewScore}%`}
                    subtitle="Highest"
                    icon={<Trophy size={28} />}
                />

                <StatsCard
                    title="ATS Score"
                    value={`${data.averageResumeScore}%`}
                    subtitle="Average Resume"
                    icon={<Target size={28} />}
                />

                <StatsCard
                    title="AI Credits"
                    value={25}
                    subtitle="Remaining"
                    icon={<Sparkles size={28} />}
                />
            </div>
            <div className="mt-10 flex gap-4">

                <div className="mt-10">
                    <QuickActions />
                </div>

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

                    <div className="max-h-[700px] space-y-8 overflow-y-auto pr-3">

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