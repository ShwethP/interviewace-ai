import Image from "next/image";
import { Sparkles } from "lucide-react";

type Props = {
    name: string;
    image?: string | null;
    interviews: number;
    resumes: number;
};

export default function DashboardHeader({
    name,
    image,
    interviews,
    resumes,
}: Props) {

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Good Morning ☀️"
            : hour < 18
                ? "Good Afternoon 🌤️"
                : "Good Evening 🌙";

    return (
        <section className="mb-12 rounded-3xl border bg-gradient-to-r from-slate-900 via-slate-800 to-black p-8 text-white shadow-xl">

            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

                <div>

                    <p className="text-sm font-medium text-gray-300">
                        {greeting}
                    </p>

                    <h1 className="mt-2 text-4xl font-bold">
                        Welcome back, {name}
                    </h1>

                    <p className="mt-4 max-w-xl text-gray-300">
                        Ready to ace your next interview?
                        Keep building your confidence with AI-powered mock interviews.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">

                        <div className="rounded-full bg-white/10 px-4 py-2 text-sm">
                            🎤 {interviews} Interviews
                        </div>

                        <div className="rounded-full bg-white/10 px-4 py-2 text-sm">
                            📄 {resumes} Resumes
                        </div>

                        <div className="flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-300">
                            <Sparkles size={16} />
                            Keep Improving
                        </div>

                    </div>

                </div>

                {image && (
                    <div className="flex justify-center">
                        <Image
                            src={image}
                            alt="Profile"
                            width={90}
                            height={90}
                            className="rounded-full border-4 border-white/20 shadow-lg"
                        />
                    </div>
                )}

            </div>

        </section>
    );
}