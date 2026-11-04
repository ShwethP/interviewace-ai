import { auth } from "@/auth";
import { redirect } from "next/navigation";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuickActions from "@/components/dashboard/QuickActions";
import { getDashboardStats } from "@/lib/dashboard";

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

            {/* Welcome Header */}

            <DashboardHeader
                name={data.user.name ?? "User"}
                image={data.user.image}
                interviews={data.totalInterviews}
                resumes={data.totalResumes}
            />

            {/* Main Shortcuts */}

            <section className="mt-12">

                <h2 className="mb-6 text-2xl font-bold">
                    Your Workspace
                </h2>

                <QuickActions />

            </section>

        </main>

    );
}