import Link from "next/link";
import {
    CalendarDays,
    Clock3,
    ArrowRight,
    Trophy,
} from "lucide-react";
import DeleteInterviewButton from "./DeleteInterviewButton";

interface Props {
    interview: {
        id: string;
        company: string;
        role: string;
        difficulty: string;
        status: string;
        overallScore: number | null;
        createdAt: Date;
    };
}

export default function InterviewCard({
    interview,
}: Props) {

    const created = new Date(interview.createdAt);

    return (

        <Link
            href={
                interview.status === "COMPLETED"
                    ? `/dashboard/interview/${interview.id}/results`
                    : `/dashboard/interview/${interview.id}`
            }
        >

            <div className="mt-4 group rounded-3xl border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="flex items-start justify-between">

                    <div>

                        <h2 className="text-2xl font-bold">
                            {interview.company}
                        </h2>

                        <p className="mt-1 text-gray-500">
                            {interview.role}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">

                            <div className="flex items-center gap-2">
                                <CalendarDays size={16} />
                                {created.toLocaleDateString()}
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock3 size={16} />
                                {created.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>

                        </div>

                    </div>

                    <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${interview.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                            }`}
                    >
                        {interview.status}
                    </span>

                </div>

                <div className="mt-6 flex flex-wrap gap-2">

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

                    {interview.techStack
                        ?.split(",")
                        .slice(0, 4)
                        .map((tech: string) => (

                            <span
                                key={tech}
                                className="rounded-full bg-slate-100 px-3 py-1 text-xs"
                            >
                                {tech.trim()}
                            </span>

                        ))}

                </div>

                <div className="mt-8 flex items-center justify-between">
                    <DeleteInterviewButton interviewId={interview.id} />

                    {interview.status === "COMPLETED" ? (

                        <div>

                            <p className="text-sm text-gray-500">
                                Overall Score
                            </p>

                            <div className="mt-2 flex items-center gap-2">

                                <Trophy className="text-yellow-500" />

                                <span className="text-3xl font-bold">
                                    {interview.overallScore}/100
                                </span>

                            </div>

                        </div>

                    ) : (

                        <div>

                            <p className="text-sm text-gray-500">
                                Interview Ready
                            </p>

                            <p className="mt-2 text-xl font-semibold">
                                Continue Practice
                            </p>

                        </div>

                    )}

                    <div className="flex items-center gap-2 font-semibold text-blue-600">

                        {interview.status === "COMPLETED"
                            ? "View Results"
                            : "Continue"}

                        <ArrowRight className="transition group-hover:translate-x-2" />

                    </div>

                </div>

            </div>

        </Link>

    );
}