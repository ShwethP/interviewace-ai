"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createResumeInterviewService } from "@/lib/services/resumeInterview.service";

export async function createResumeInterview(formData: FormData) {

    const session = await auth();

    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }

    const resumeId = formData.get("resumeId") as string;

    if (!resumeId) {
        throw new Error("Resume ID is required");
    }

    const interview = await createResumeInterviewService(
        resumeId,
        session.user.email
    );

    redirect(`/dashboard/interview/${interview.id}`);
}