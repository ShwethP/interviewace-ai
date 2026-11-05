import { Job, JobSearchResult } from "@/lib/jobs/types";

const JOBICY_API_URL = "https://jobicy.com/api/jobs";

// Original Jobicy response structure
interface JobicyApiJob {
    id: number;
    url: string;

    jobTitle: string;
    companyName: string;
    companyLogo?: string;

    jobIndustry?: string[];
    jobType?: string[];
    jobGeo?: string;
    jobLevel?: string;

    jobExcerpt?: string;
    jobDescription?: string;

    pubDate: string;

    salaryMin?: number;
    salaryMax?: number;
    salaryCurrency?: string;
    salaryPeriod?: string;
}

interface JobicyApiResponse {
    jobCount: number;
    jobs: JobicyApiJob[];

    nextCursor: string | null;
    hasMore: boolean;

    success?: boolean;
    error?: string;
}

interface JobicySearchParams {
    keyword?: string;
    industry?: string;
    geo?: string;
    count?: number;
    cursor?: string;
}

// Convert Jobicy data into our standard Job structure
function mapJob(job: JobicyApiJob): Job {
    return {
        id: `jobicy-${job.id}`,
        source: "jobicy",

        title: job.jobTitle,
        company: job.companyName,
        companyLogo: job.companyLogo,

        industry: job.jobIndustry ?? [],
        employmentType: job.jobType ?? [],
        location: job.jobGeo ?? "Not specified",
        experienceLevel: job.jobLevel,

        excerpt: job.jobExcerpt ?? "",
        description: job.jobDescription ?? "",

        postedAt: job.pubDate,

        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryCurrency: job.salaryCurrency,
        salaryPeriod: job.salaryPeriod,

        applicationUrl: job.url,
    };
}

// Fetch jobs from Jobicy
export async function getJobicyJobs(
    params: JobicySearchParams
): Promise<JobSearchResult> {

    const searchParams = new URLSearchParams();

    searchParams.set("count", String(params.count ?? 20));

    if (params.keyword) {
        searchParams.set("tag", params.keyword);
    }

    if (params.industry) {
        searchParams.set("industry", params.industry);
    }

    if (params.geo) {
        searchParams.set("geo", params.geo);
    }

    if (params.cursor) {
        searchParams.set("cursor", params.cursor);
    }

    const url = `${JOBICY_API_URL}?${searchParams.toString()}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
        throw new Error(
            `Jobicy API failed with status ${response.status}`
        );
    }

    const data: JobicyApiResponse = await response.json();

    if (data.success === false) {
        throw new Error(data.error || "Jobicy API returned an error");
    }

    return {
        jobs: data.jobs.map(mapJob),
        jobCount: data.jobCount,
        nextCursor: data.nextCursor ?? null,
        hasMore: data.hasMore ?? false,
    };
}