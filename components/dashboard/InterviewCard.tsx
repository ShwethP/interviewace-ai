import Link from "next/link";
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

    return (

        <Link
            href={
                interview.status === "COMPLETED"
                    ? `/dashboard/interview/${interview.id}/results`
                    : `/dashboard/interview/${interview.id}`
            }
            className="block rounded-xl border p-6 transition hover:shadow-lg"
        >

            <div className="flex items-center justify-between">

                <div>

                    <h3 className="text-xl font-semibold">
                        {interview.company}
                    </h3>

                    <p className="text-gray-500">
                        {interview.role}
                    </p>

                </div>

                <div className="flex items-center gap-3">

                    <span
                        className={`rounded-full px-3 py-1 text-sm ${interview.status === "COMPLETED"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                            }`}
                    >
                        {interview.status}
                    </span>

                    <DeleteInterviewButton
                        interviewId={interview.id}
                    />

                </div>

            </div>

            <div className="mt-6 flex justify-between">

                <span
                    className={`rounded-full px-3 py-1 text-sm font-medium
    ${interview.difficulty === "Easy"
                            ? "bg-green-100 text-green-700"
                            : interview.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                >
                    {interview.difficulty}
                </span>

                <span>
                    <div className="text-right">

                        <p className="text-sm text-gray-500">
                            Score
                        </p>

                        <p className="text-2xl font-bold">
                            {interview.overallScore ?? "--"}
                        </p>

                    </div>
                </span>

            </div>

        </Link>

    );

}