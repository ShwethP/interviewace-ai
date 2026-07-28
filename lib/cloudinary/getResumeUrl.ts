import cloudinary from "@/lib/cloudinary";

export function getResumeUrl(publicId: string) {
    return cloudinary.url(publicId, {
        resource_type: "image",
        secure: true,
    });
}