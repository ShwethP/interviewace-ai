"use client";

import { useFormStatus } from "react-dom";
import { Loader2, Sparkles } from "lucide-react";

import { createResumeInterview } from "@/lib/actions/createResumeInterview";

function StartInterviewButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {pending ? (
                <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Preparing Your Interview...
                </>
            ) : (
                <>
                    <Sparkles className="h-5 w-5" />
                    Start AI Interview
                </>
            )}
        </button>
    );
}

export default function ResumeInterviewButton({
    resumeId,
}: {
    resumeId: string;
}) {
    return (
        <form action={createResumeInterview}>
            <input
                type="hidden"
                name="resumeId"
                value={resumeId}
            />

            <StartInterviewButton />
        </form>
    );
}