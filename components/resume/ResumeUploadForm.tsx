"use client";

import { uploadResume } from "@/lib/actions/uploadResume";

export default function ResumeUploadForm() {

    return (

        <form
            action={uploadResume}
            className="mt-10 space-y-6"
        >

            <input
                type="file"
                name="resume"
                accept=".pdf"
                required
                className="w-full rounded-lg border p-4"
            />

            <button
                className="rounded-lg bg-black px-6 py-3 text-white"
            >
                Upload Resume
            </button>

        </form>

    );

}