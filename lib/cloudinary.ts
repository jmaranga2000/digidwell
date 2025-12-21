// lib/cloudinary.ts
import { v2 as cloudinary, UploadApiOptions } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

/**
 * Uploads a file to Cloudinary and returns the secure URL.
 *
 * @param file - The file object (from <input type="file">)
 * @param folder - Cloudinary folder path
 * @param options - Optional Cloudinary upload options
 * @returns Secure URL of the uploaded image
 */
export async function uploadImageToCloudinary(
  file: File,
  folder: string,
  options?: UploadApiOptions
): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, ...options }, (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Unknown upload error"));
        } else {
          resolve(result.secure_url);
        }
      })
      .end(buffer);
  });
}