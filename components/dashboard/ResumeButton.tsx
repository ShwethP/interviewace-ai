import Link from "next/link";

export default function ResumeButton() {
    return (
        <Link
            href="/dashboard/resume"
            className="rounded-lg border px-6 py-3 hover:bg-gray-100"
        >
            Analyze Resume
        </Link>
    );
}