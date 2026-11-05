import { getJobicyJobs } from "@/lib/jobs/providers/jobicy";
import { JobSearchResult } from "@/lib/jobs/types";

interface JobSearchInput {
    keyword?: string;
    industry?: string;
    geo?: string;
    count?: number;
    cursor?: string;
}

export async function searchJobs(
    filters: JobSearchInput
): Promise<JobSearchResult> {

    // Currently Jobicy is our only provider.
    const result = await getJobicyJobs({
        keyword: filters.keyword,
        industry: filters.industry,
        geo: filters.geo,
        count: filters.count,
        cursor: filters.cursor,
    });
    return result;
}