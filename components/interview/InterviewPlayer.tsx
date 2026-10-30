"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { finishInterview } from "@/lib/actions/finishInterview";
import { saveAnswer } from "@/lib/actions/saveAnswer";

interface Question {
    id: string;
    question: string;
    category?: string;
    difficulty?: string;
    answer?: string | null;
}

interface Interview {
    id: string;
    company: string;
    role: string;
    questions: Question[];
}

interface Props {
    interview: Interview;
}

export default function InterviewPlayer({
    interview,
}: Props) {

    const router = useRouter();

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [answers, setAnswers] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        for (const q of interview?.questions ?? []) {
            if (q.answer) {
                initial[q.id] = q.answer;
            }
        }
        return initial;
    });

    const [isSaving, setIsSaving] = useState(false);
    const [isFinishing, setIsFinishing] = useState(false);

    const questions = interview?.questions ?? [];
    const totalQuestions = questions.length;

    if (totalQuestions === 0) {
        return (
            <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
                <h2 className="text-xl font-semibold">No questions available</h2>
                <p className="mt-2 text-gray-500">This interview currently has no questions.</p>
                <button
                    type="button"
                    onClick={() => router.push("/dashboard")}
                    className="mt-6 rounded bg-black px-6 py-3 text-white transition-opacity hover:opacity-90"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    const safeIndex = Math.min(Math.max(0, currentQuestion), totalQuestions - 1);
    const question = questions[safeIndex];

    const currentAnswer = answers[question.id] ?? question.answer ?? "";

    const handleNext = async () => {
        if (isSaving || isFinishing || !question) return;

        try {
            setIsSaving(true);
            await saveAnswer(
                question.id,
                currentAnswer
            );

            setCurrentQuestion((prev) =>
                prev < totalQuestions - 1 ? prev + 1 : prev
            );
        } catch (error) {
            console.error("Failed to save answer:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handlePrevious = () => {
        if (isSaving || isFinishing) return;
        setCurrentQuestion((prev) => Math.max(0, prev - 1));
    };

    const handleFinish = async () => {
        if (isFinishing || isSaving || !question) return;

        try {
            setIsFinishing(true);
            await saveAnswer(
                question.id,
                currentAnswer
            );

            await finishInterview(interview.id);

            router.push(`/dashboard/interview/${interview.id}/results`);
        } catch (error) {
            console.error("Failed to finish interview:", error);
            setIsFinishing(false);
        }
    };

    const progressPercentage = ((safeIndex + 1) / totalQuestions) * 100;

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
                        width: `${progressPercentage}%`,
                    }}
                />
            </div>

            <div className="mt-10 rounded-lg border bg-white p-8 shadow-sm">

                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        Question {safeIndex + 1} of {totalQuestions}
                    </h2>
                    {question.category && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                            {question.category}
                        </span>
                    )}
                </div>

                <p className="mt-6 text-lg font-medium text-gray-800">
                    {question.question}
                </p>

                <textarea
                    rows={8}
                    className="mt-8 w-full rounded-lg border p-4 focus:border-black focus:outline-none"
                    placeholder="Type your answer..."
                    value={currentAnswer}
                    disabled={isFinishing}
                    onChange={(e) =>
                        setAnswers((prev) => ({
                            ...prev,
                            [question.id]: e.target.value,
                        }))
                    }
                />

                <div className="mt-8 flex items-center justify-between">

                    <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={safeIndex === 0 || isSaving || isFinishing}
                        className="rounded border px-6 py-3 font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        ← Previous
                    </button>

                    {safeIndex === totalQuestions - 1 ? (
                        <button
                            type="button"
                            onClick={handleFinish}
                            disabled={isFinishing || isSaving}
                            className="flex items-center gap-2 rounded bg-green-600 px-6 py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isFinishing ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Evaluating Interview...
                                </>
                            ) : (
                                "Finish Interview"
                            )}
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={isSaving || isFinishing}
                            className="flex items-center gap-2 rounded bg-black px-6 py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Next →"
                            )}
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
}
