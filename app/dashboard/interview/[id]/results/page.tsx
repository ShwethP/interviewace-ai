import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function ResultsPage({
    params,
}: Props) {

    const { id } = await params;

    const interview = await prisma.interview.findUnique({
        where: {
            id,
        },
        include: {
            questions: true,
        },
    });
    if (!interview) {
        return (
            <main className="mx-auto max-w-5xl p-10">
                <h1 className="text-2xl font-bold">
                    Interview not found
                </h1>
            </main>
        );
    }
    const totalQuestions = interview.questions.length;

    const averageScore =
        totalQuestions === 0
            ? 0
            : interview.questions.reduce(
                (sum: any, q: any) => sum + (q.score ?? 0),
                0
            ) / totalQuestions;

    const status =
        (interview.overallScore ?? 0) >= 70
            ? "Passed"
            : "Needs Improvement";

    if (!interview) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-5xl p-10">

            <div className="rounded-xl border bg-white p-8 shadow-sm">

                <h1 className="text-3xl font-bold">
                    Interview Results
                </h1>

                <p className="mt-2 text-gray-500">
                    {interview.company} • {interview.role}
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-3">

                    <div className="rounded-lg border p-6">

                        <p className="text-gray-500">
                            Average Question Score
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {averageScore.toFixed(1)}/10
                        </h2>

                    </div>

                    <div className="rounded-lg border p-6">

                        <p className="text-gray-500">
                            Questions
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {totalQuestions}
                        </h2>

                    </div>

                    <div className="rounded-lg border p-6">

                        <p className="text-gray-500">
                            Status
                        </p>

                        <h2
                            className={`mt-2 text-3xl font-bold ${status === "Passed"
                                ? "text-green-600"
                                : "text-red-600"
                                }`}
                        >
                            {status}
                        </h2>

                    </div>

                </div>
                <div className="mt-8">

                    <div className="flex items-center justify-between">

                        <h2 className="text-xl font-semibold">
                            Overall Score
                        </h2>

                        <span className="text-4xl font-bold">
                            {interview.overallScore}/100
                        </span>

                    </div>

                    <div className="mt-4 h-4 w-full rounded-full bg-gray-200">

                        <div
                            className="h-4 rounded-full bg-black transition-all"
                            style={{
                                width: `${interview.overallScore ?? 0}%`,
                            }}
                        />

                    </div>

                    <p className="mt-6 whitespace-pre-line text-gray-700">
                        {interview.overallFeedback}
                    </p>

                </div>

            </div>

            <div className="mt-10 space-y-6">

                {interview.questions.map((question: any, index: any) => (

                    <div
                        key={question.id}
                        className="rounded-xl border bg-white p-6 shadow-sm"
                    >

                        <div className="flex items-center justify-between">

                            <h2 className="text-xl font-semibold">
                                Question {index + 1}
                            </h2>

                            <span
                                className={`rounded-full px-4 py-1 text-white ${(question.score ?? 0) >= 8
                                    ? "bg-green-600"
                                    : (question.score ?? 0) >= 5
                                        ? "bg-yellow-500"
                                        : "bg-red-600"
                                    }`}
                            >
                                {question.score}/10
                            </span>

                        </div>

                        <p className="mt-5 text-lg">
                            {question.question}
                        </p>

                        <div className="mt-6">

                            <p className="font-semibold">
                                Category
                            </p>

                            <p className="text-gray-600">
                                {question.category}
                            </p>

                        </div>

                        <div className="mt-6">

                            <p className="font-semibold">
                                Your Answer
                            </p>

                            <div className="mt-2 rounded-lg bg-gray-100 p-4">
                                {question.answer || "No answer"}
                            </div>

                        </div>

                        <div className="mt-6">

                            <p className="font-semibold">
                                AI Feedback
                            </p>

                            <div className="mt-2 rounded-lg border border-green-200 bg-green-50 p-4 text-gray-700">
                                {question.feedback}
                            </div>

                        </div>

                        {question.idealAnswer && (

                            <div className="mt-6">

                                <p className="font-semibold">
                                    Ideal Answer
                                </p>

                                <div className="mt-2 rounded-lg border border-blue-200 bg-blue-50 p-4 text-gray-700">
                                    {question.idealAnswer}
                                </div>

                            </div>

                        )}

                    </div>

                ))}

            </div>

        </main>
    );
}