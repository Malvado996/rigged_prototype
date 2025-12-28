import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 10 } })
        .middleware(async ({ req }) => {
            // Add auth later — for now allow all
            return { userId: "temp" };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete!", file.url);
            return { uploadedBy: metadata.userId };
        }),
};

export type OurFileRouter = typeof ourFileRouter;