"use server";

import { auth } from "@/auth";
import { createInterviewService } from "@/lib/services/interview.service";
import { redirect } from "next/navigation";

export async function createInterview(formData: FormData) {

    const session = await auth();

    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }

    const interview = await createInterviewService(
        formData,
        session.user.email
    );

    redirect(`/dashboard/interview/${interview.id}`);
}