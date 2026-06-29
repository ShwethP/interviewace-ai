import ResumeUploadForm from "@/components/resume/ResumeUploadForm";

export default function ResumePage() {
    return (
        <main className="mx-auto max-w-3xl p-10">

            <h1 className="text-3xl font-bold">
                Resume Analyzer
            </h1>

            <p className="mt-2 text-gray-500">
                Upload your resume to receive an AI-powered ATS review.
            </p>

            <ResumeUploadForm />

        </main>
    );
}