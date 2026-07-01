import Link from "next/link";
import {
    Calendar,
    Clock3,
    Trophy,
    Code2,
    Building2,
    ArrowRight,
} from "lucide-react";

interface Props {
    interview: any;
}

export default function InterviewCard({ interview }: Props) {
    const created = new Date(interview.createdAt);

    return (
        <Link
            href={
                interview.status === "COMPLETED"
                    ? `/dashboard/interview/${interview.id}/results`
                    : `/dashboard/interview/${interview.id}`
            }
        >
            <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-black hover:shadow-xl">

                {/* Header */}

                <div className="flex items-start justify-between">

                    <div className="flex gap-4">

                        <div className="rounded-xl bg-black p-3 text-white">
                            <Building2 size={22} />
                        </div>

                        <div>

                            <h2 className="text-xl font-bold">
                                {interview.company}
                            </h2>

                            <p className="mt-1 text-gray-500">
                                {interview.role}
                            </p>

                        </div>

                    </div>

                    <span
                        className={`rounded-full px-4 py-1 text-xs font-semibold ${interview.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                            }`}
                    >
                        {interview.status}
                    </span>

                </div>

                {/* Date */}

                <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-500">

                    <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {created.toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        <Clock3 size={16} />
                        {created.toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>

                </div>

                {/* Footer */}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">

                    <div className="flex items-center gap-3">

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${interview.difficulty === "Easy"
                                ? "bg-green-100 text-green-700"
                                : interview.difficulty === "Medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                        >
                            {interview.difficulty}
                        </span>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Code2 size={15} />
                            <span className="max-w-[250px] truncate">
                                {interview.techStack}
                            </span>
                        </div>

                    </div>

                    {interview.status === "COMPLETED" ? (
                        <div className="flex items-center gap-2">

                            <Trophy
                                size={18}
                                className="text-yellow-500"
                            />

                            <span className="text-2xl font-bold">
                                {interview.overallScore}/100
                            </span>

                        </div>
                    ) : (
                        <div className="flex items-center gap-2 font-medium text-black transition group-hover:translate-x-1">
                            Continue
                            <ArrowRight size={18} />
                        </div>
                    )}

                </div>

            </div>
        </Link>
    );
}