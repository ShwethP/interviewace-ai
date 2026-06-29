"use client";

import { useRouter } from "next/navigation";

export default function StartInterviewButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push("/dashboard/new")}
            className="mt-10 rounded-lg bg-black px-6 py-3 text-white"
        >
            Start Interview
        </button>
    );
}