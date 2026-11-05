
"use client";

import { useEffect, useState } from "react";
import {
    Search,
    MapPin,
    Briefcase,
    ExternalLink,
    Building2,
} from "lucide-react";

import type { Job } from "@/lib/jobs/types";

export default function CompaniesPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [keyword, setKeyword] = useState("");

    async function fetchJobs(search = "") {
        try {
            setLoading(true);
            setError("");

            const params = new URLSearchParams({
                count: "20",
            });

            if (search.trim()) {
                params.set("keyword", search.trim());
            }

            const response = await fetch(`/api/jobs?${params}`);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Unable to fetch jobs");
            }

            setJobs(data.jobs ?? []);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        fetchJobs(keyword);
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8">

            {/* Page Header */}
            <div className="mb-8">
                <p className="text-sm font-medium text-blue-600 mb-2">
                    CAREER EXPLORER
                </p>

                <h1 className="text-3xl font-bold text-gray-900">
                    Discover Jobs
                </h1>

                <p className="text-gray-500 mt-2">
                    Explore opportunities and find your next career move.
                </p>
            </div>

            {/* Search Section */}
            <form
                onSubmit={handleSearch}
                className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3"
            >
                <div className="flex items-center gap-3 flex-1 border border-gray-200 rounded-lg px-4">
                    <Search size={19} className="text-gray-400" />

                    <input
                        type="text"
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                        placeholder="Search job title, skill or keyword..."
                        className="w-full py-3 outline-none text-sm text-gray-800"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-7 py-3 rounded-lg text-sm font-medium transition"
                >
                    Search Jobs
                </button>
            </form>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Available Opportunities
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {loading
                            ? "Fetching opportunities..."
                            : `${jobs.length} jobs found`}
                    </p>
                </div>

                <span className="text-xs text-gray-500">
                    Source: Jobicy
                </span>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-500">
                    Loading jobs...
                </div>
            )}

            {/* Error State */}
            {!loading && error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-700 text-sm">
                    {error}
                    <button
                        onClick={() => fetchJobs(keyword)}
                        className="ml-3 underline font-medium"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Empty State */}
            {!loading && !error && jobs.length === 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
                    <Briefcase
                        size={32}
                        className="mx-auto text-gray-400 mb-3"
                    />

                    <h3 className="font-semibold text-gray-800">
                        No jobs found
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Try another keyword.
                    </p>
                </div>
            )}

            {/* Job Cards */}
            {!loading && !error && jobs.length > 0 && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {jobs.map((job) => (
                        <article
                            key={job.id}
                            className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                        >
                            <div className="flex items-start gap-4">

                                {/* Company Logo */}
                                <div className="w-12 h-12 shrink-0 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                    {job.companyLogo ? (
                                        <img
                                            src={job.companyLogo}
                                            alt={`${job.company} logo`}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <Building2
                                            size={22}
                                            className="text-gray-400"
                                        />
                                    )}
                                </div>

                                {/* Job Information */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-base">
                                        {job.title}
                                    </h3>

                                    <p className="text-sm text-gray-600 mt-1">
                                        {job.company}
                                    </p>

                                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <MapPin size={14} />
                                            {job.location}
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <Briefcase size={14} />
                                            {job.employmentType.join(", ") || "Not specified"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Job Description Preview */}
                            <p className="text-sm text-gray-600 leading-6 mt-5 line-clamp-3">
                                {job.excerpt || "No description available."}
                            </p>

                            {/* Job Footer */}
                            <div className="flex items-center justify-between border-t border-gray-100 mt-5 pt-4">
                                <span className="text-xs text-gray-400">
                                    {new Date(job.postedAt).toLocaleDateString()}
                                </span>

                                <a
                                    href={job.applicationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                    View Job
                                    <ExternalLink size={15} />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
