import InterviewForm from "@/components/interview/InterviewForm";

export default function NewInterviewPage() {
    return (
        <main className="mx-auto max-w-3xl p-10">
            <h1 className="text-4xl font-bold">
                Create AI Interview
            </h1>

            <p className="text-gray-500 mt-2">
                Fill in the details to generate an interview.
            </p>

            <InterviewForm />
        </main>
    );
}