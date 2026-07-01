"use client";

import { uploadResume } from "@/lib/actions/uploadResume";

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
                    <span className="ml-2 text-gray-500 font-normal">
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

            <button
                type="submit"
                className="w-full rounded-xl bg-black py-4 text-lg font-semibold text-white transition hover:scale-[1.01] hover:bg-gray-800 active:scale-100"
            >
                Analyze Resume
            </button>
        </form>
    );
}