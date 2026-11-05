export interface Job {
    id: string;
    source: "jobicy" | "adzuna";

    title: string;
    company: string;
    companyLogo?: string;

    industry: string[];
    employmentType: string[];
    location: string;
    experienceLevel?: string;

    excerpt: string;
    description: string;

    postedAt: string;

    salaryMin?: number;
    salaryMax?: number;
    salaryCurrency?: string;
    salaryPeriod?: string;

    applicationUrl: string;
}

export interface JobSearchResult {
    jobs: Job[];
    jobCount: number;
    nextCursor: string | null;
    hasMore: boolean;
}