import cloudinary from "@/lib/cloudinary";

export async function deleteResumeFromCloudinary(
    publicId: string
) {

    await cloudinary.uploader.destroy(
        publicId,
        {
            resource_type: "image",
        }
    );

}