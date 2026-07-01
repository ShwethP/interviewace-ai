"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { redirect } from "next/navigation";

export async function uploadResume(formData: FormData) {

    const session = await auth();

    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }
    4
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    const file = formData.get("resume") as File;

    const jobDescription =
        (formData.get("jobDescription") as string)?.trim() || null;

    if (!file) {
        throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const base64 = buffer.toString("base64");

    const dataURI =
        `data:${file.type};base64,${base64}`;

    const uploadResult =
        await cloudinary.uploader.upload(dataURI, {
            folder: "ai-interview-platform/resumes",
            resource_type: "raw",
            public_id: `${Date.now()}-${file.name.replace(".pdf", "")}`,
        });

    const resume = await prisma.resume.create({
        data: {
            fileUrl: uploadResult.secure_url,
            userId: user.id,

            // temporary
            jobDescription,
        },
    });

    redirect(`/dashboard/resume/${resume.id}`);

}