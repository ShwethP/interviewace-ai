"use server";


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

    // const bytes = await file.arrayBuffer();

    // const buffer = Buffer.from(bytes);

    // const uploadResult = await new Promise<any>((resolve, reject) => {

    //     const stream = cloudinary.uploader.upload_stream(
    //         {
    //             folder: "ai-interview-platform/resumes",

    //             resource_type: "image",

    //             use_filename: true,

    //             unique_filename: true,

    //             filename_override: file.name,
    //         },

    //         (error, result) => {

    //             if (error) {
    //                 reject(error);
    //                 return;
    //             }

    //             resolve(result);

    //         }
    //     );

    //     stream.end(buffer);

    // });

    // console.log("UPLOAD RESULT:", uploadResult.secure_url);
    // console.dir(uploadResult, { depth: null });
    // const resume = await prisma.resume.create({
    //     data: {
    //         fileUrl: uploadResult.secure_url,

    //         cloudinaryPublicId: uploadResult.public_id,

    //         originalFileName: file.name,

    //         userId: user.id,
    //     },
    // });

    // redirect(`/dashboard/resume/${resume.id}`);
    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
        .from("resumes")
        .upload(fileName, buffer, {
            contentType: "application/pdf",
            upsert: false,
        });

    if (error) {
        throw new Error(error.message);
    }

    const {
        data: { publicUrl },
    } = supabase.storage
        .from("resumes")
        .getPublicUrl(fileName);

    console.log("SUPABASE URL:", publicUrl);

    const resume = await prisma.resume.create({
        data: {
            fileUrl: publicUrl,

            originalFileName: file.name,

            userId: user.id,
        },
    });

    redirect(`/dashboard/resume/${resume.id}`);

}