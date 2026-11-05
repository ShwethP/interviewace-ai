
import { NextRequest, NextResponse } from "next/server";
import { searchJobs } from "@/lib/services/job.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;

        const keyword = searchParams.get("keyword")?.trim();
        const industry = searchParams.get("industry") || undefined;
        const geo = searchParams.get("geo") || undefined;
        const cursor = searchParams.get("cursor") || undefined;

        const requestedCount = Number(
            searchParams.get("count") ?? 20
        );

        const count = Number.isFinite(requestedCount)
            ? Math.min(100, Math.max(1, Math.floor(requestedCount)))
            : 20;

        if (keyword && (keyword.length < 3 || keyword.length > 50)) {
            return NextResponse.json(
                { error: "Keyword must contain 3 to 50 characters." },
                { status: 400 }
            );
        }

        const result = await searchJobs({
            keyword,
            industry,
            geo,
            count,
            cursor,
        });

        return NextResponse.json(result);

    } catch (error) {
        console.error("Job search error:", error);

        return NextResponse.json(
            { error: "Unable to fetch jobs right now." },
            { status: 502 }
        );
    }
}
