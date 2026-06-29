"use server";

import { evaluateResumeService } from "@/lib/services/evaluateResume.service";

export async function evaluateResume(
    resumeId: string
) {
    await evaluateResumeService(resumeId);
}