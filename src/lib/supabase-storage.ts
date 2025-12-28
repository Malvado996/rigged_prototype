import { supabase } from "../lib/supabase";

export const uploadPhoto = async (file: File, folder: string = "posts") => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
        .from("rigged_photos")  // Your bucket name
        .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (error) {
        console.error("Upload error:", error);
        throw error;
    }

    // Get public URL (since bucket private, we'll switch to signed URLs later)
    const { data: publicUrlData } = supabase.storage
        .from("rigged_photos")
        .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
};