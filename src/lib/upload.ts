import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { slugify } from "@/lib/utils";

const uploadRoot = path.join(process.cwd(), "public", "uploads");

function configureCloudinary() {
  if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return true;
  }

  return false;
}

export async function saveUploadedFile(file: File, folder: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const safeName = `${Date.now()}-${slugify(file.name.replace(/\.[^/.]+$/, ""))}${path.extname(file.name)}`;

  if (configureCloudinary()) {
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `college-sta/${folder}`,
          resource_type: "auto",
          public_id: safeName.replace(path.extname(safeName), ""),
        },
        (error, uploaded) => {
          if (error || !uploaded) {
            reject(error);
            return;
          }
          resolve(uploaded);
        },
      );

      stream.end(buffer);
    });

    return result.secure_url;
  }

  const targetDirectory = path.join(uploadRoot, folder);
  await mkdir(targetDirectory, { recursive: true });

  const filePath = path.join(targetDirectory, safeName);
  await writeFile(filePath, buffer);

  return `/uploads/${folder}/${safeName}`;
}
