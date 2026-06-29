"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { finishInterview } from "@/lib/actions/finishInterview";
import { saveAnswer } from "@/lib/actions/saveAnswer";

interface Props {
    interview: any;
}

export default function InterviewPlayer({
    interview,
}: Props) {

    const router = useRouter();

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState<Record<string, string>>({});

    const question = interview.questions[currentQuestion];

    const handleNext = async () => {

        await saveAnswer(
            question.id,
            answers[question.id] ?? ""
        );

        if (currentQuestion < interview.questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {

        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const handleFinish = async () => {

        await saveAnswer(
            question.id,
            answers[question.id] ?? ""
        );

        await finishInterview(interview.id);

        // Change this to your results page later
        router.push(`/dashboard/interview/${interview.id}/results`);
    };

    return (
        <div>

            <h1 className="text-3xl font-bold">
                {interview.company}
            </h1>

            <p className="mt-2 text-gray-500">
                {interview.role}
            </p>

            <div className="mt-8 h-3 w-full rounded-full bg-gray-200">
                <div
                    className="h-3 rounded-full bg-black transition-all duration-300"
                    style={{
                        width: `${((currentQuestion + 1) /
                            interview.questions.length) * 100}%`,
                    }}
                />
            </div>

            <div className="mt-10 rounded-lg border p-8">

                <h2 className="text-lg font-semibold">
                    Question {currentQuestion + 1} of {interview.questions.length}
                </h2>

                <p className="mt-6 text-lg">
                    {question.question}
                </p>

                <textarea
                    rows={8}
                    className="mt-8 w-full rounded-lg border p-4"
                    placeholder="Type your answer..."
                    value={answers[question.id] ?? ""}
                    onChange={(e) =>
                        setAnswers((prev) => ({
                            ...prev,
                            [question.id]: e.target.value,
                        }))
                    }
                />

                <div className="mt-8 flex justify-between">

                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="rounded border px-6 py-3 disabled:opacity-40"
                    >
                        ← Previous
                    </button>

                    {currentQuestion === interview.questions.length - 1 ? (
                        <button
                            onClick={handleFinish}
                            className="rounded bg-green-600 px-6 py-3 text-white"
                        >
                            Finish Interview
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="rounded bg-black px-6 py-3 text-white"
                        >
                            Next →
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
}