import cloudinary from "../lib/cloudinary.js";

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }

        if (!result?.secure_url) {
          return reject(new Error("Cloudinary did not return a secure URL"));
        }

        resolve(result.secure_url);
      },
    );

    stream.end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (imageUrl: string) => {
  try {
    const parts = imageUrl.split("/");
    const fileName = parts[parts.length - 1];
    const publicId = `products/${fileName.split(".")[0]}`;
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("cloudinary delete error", error);
    throw error;
  }
};
