"use server";

import { evaluateInterviewService } from "@/lib/services/evaluateInterview.service";

export async function finishInterview(
    interviewId: string
) {
    await evaluateInterviewService(interviewId);
}