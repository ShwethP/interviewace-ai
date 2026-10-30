"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { uploadResume } from "@/lib/actions/uploadResume";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-lg font-semibold text-white transition hover:scale-[1.01] hover:bg-gray-800 active:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {pending ? (
                <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Uploading & Preparing Analysis...
                </>
            ) : (
                "Analyze Resume"
            )}
        </button>
    );
}

export default function ResumeUploadForm() {
    return (
        <form
            action={uploadResume}
            className="mt-10 space-y-8"
        >
            <div>
                <label className="mb-2 block text-sm font-semibold">
                    Upload Resume
                </label>

                <input
                    type="file"
                    name="resume"
                    accept=".pdf"
                    required
                    className="w-full rounded-xl border p-4"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-semibold">
                    Job Description
                    <span className="ml-2 font-normal text-gray-500">
                        (Optional)
                    </span>
                </label>

                <textarea
                    name="jobDescription"
                    rows={12}
                    placeholder="Paste the Job Description here..."
                    className="w-full rounded-xl border p-4"
                />
            </div>

            <SubmitButton />
        </form>
    );
}
