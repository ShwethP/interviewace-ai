"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

import { createInterview } from "@/lib/actions/createInterview";
function GenerateInterviewButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {pending ? (
                <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating Questions...
                </>
            ) : (
                "Generate AI Interview"
            )}
        </button>
    );
}

export default function InterviewForm() {
    return (
        <form
            action={createInterview}
            className="mt-10 space-y-6"
        >
            <input
                required
                name="company"
                placeholder="Company (Google, Amazon...)"
                className="w-full rounded border p-3"
            />

            <input
                required
                name="role"
                placeholder="Role (Backend Engineer)"
                className="w-full rounded border p-3"
            />

            <input
                required
                type="number"
                min="0"
                max="20"
                name="experience"
                placeholder="Years of Experience"
                className="w-full rounded border p-3"
            />

            <select
                required
                name="difficulty"
                className="w-full rounded border p-3"
            >
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>

            <select
                required
                name="interviewType"
                className="w-full rounded border p-3"
            >
                <option value="">Interview Type</option>
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="System Design">System Design</option>
                <option value="Behavioral">Behavioral</option>
            </select>

            <textarea
                required
                name="techStack"
                placeholder="Node.js, PostgreSQL, Redis..."
                className="w-full rounded border p-3"
            />

            <GenerateInterviewButton />
        </form>
    );
}