"use client";

import { createInterview } from "@/lib/actions/createInterview";

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

            <button
                className="rounded-lg bg-black px-6 py-3 text-white"
            >
                Generate AI Interview
            </button>
        </form>
    );
}