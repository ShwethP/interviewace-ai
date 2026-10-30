"use server";

import fs from "fs";
import path from "path";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

export async function uploadResume(formData: FormData) {

    const session = await auth();

    if (!session?.user?.email) {
        throw new Error("Unauthorized");
    }

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
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${Date.now()}-${sanitizedFileName}`;

    let fileUrl: string;

    try {
        const { error } = await supabase.storage
            .from("resumes")
            .upload(fileName, buffer, {
                contentType: "application/pdf",
                upsert: false,
            });

        if (error) {
            throw error;
        }

        const {
            data: { publicUrl },
        } = supabase.storage
            .from("resumes")
            .getPublicUrl(fileName);

        fileUrl = publicUrl;
        console.log("Uploaded resume to Supabase:", fileUrl);
    } catch (uploadError: any) {
        console.warn(
            "Supabase storage upload failed, saving to local storage instead:",
            uploadError?.message || uploadError
        );

        // Fallback to local storage in public/uploads/resumes
        const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
        await fs.promises.mkdir(uploadDir, { recursive: true });
        const localFilePath = path.join(uploadDir, fileName);
        await fs.promises.writeFile(localFilePath, buffer);

        fileUrl = `/uploads/resumes/${fileName}`;
        console.log("Saved resume locally to:", fileUrl);
    }

    const resume = await prisma.resume.create({
        data: {
            fileUrl,
            originalFileName: file.name,
            jobDescription,
            userId: user.id,
        },
    });

    redirect(`/dashboard/resume/${resume.id}`);

}
