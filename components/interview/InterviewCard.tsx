import Link from "next/link";

interface Props {
    interview: any;
}

export default function InterviewCard({
    interview,
}: Props) {

    return (

        <Link
            href={
                interview.status === "COMPLETED"
                    ? `/dashboard/interview/${interview.id}/results`
                    : `/dashboard/interview/${interview.id}`
            }
        >

            <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg">

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-xl font-bold">
                            {interview.company}
                        </h2>

                        <p className="mt-1 text-gray-500">
                            {interview.role}
                        </p>
                        <p className="mt-2 text-sm text-gray-400">
                            {new Date(interview.createdAt).toLocaleDateString()}
                        </p>

                    </div>

                    <div className="text-right">

                        <span
                            className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${interview.status === "COMPLETED"
                                ? "bg-green-600"
                                : "bg-yellow-500"
                                }`}
                        >
                            {interview.status}
                        </span>

                        {interview.status === "COMPLETED" && (

                            <p className="mt-3 text-3xl font-bold">
                                {interview.overallScore}/100
                            </p>

                        )}

                    </div>

                </div>

                <div className="mt-6 flex justify-between text-gray-500">

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${interview.difficulty === "Easy"
                            ? "bg-green-500"
                            : interview.difficulty === "Medium"
                                ? "bg-yellow-500"
                                : "bg-red-600"
                            }`}
                    >
                        {interview.difficulty}
                    </span>

                    <p
                        className="max-w-xs truncate text-sm text-gray-500"
                        title={interview.techStack}
                    >
                        {interview.techStack}
                    </p>

                </div>

            </div>

        </Link>

    );

}