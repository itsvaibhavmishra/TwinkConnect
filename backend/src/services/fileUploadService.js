import cloudinary from "cloudinary";
import streamifier from "streamifier";
import createHttpError from "http-errors";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (mainFolder, file, subFolder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      {
        folder: `${mainFolder}/${subFolder}`,
        public_id: file.originalname,
      },
      (error, result) => {
        if (error) {
          reject(
            createHttpError.InternalServerError(
              "Error uploading file to Cloudinary"
            )
          );
        } else {
          resolve(result.secure_url);
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export const uploadFiles = async (mainFolder, files, subFolder) => {
  try {
    // Ensure files is an array
    const filesArray = Array.isArray(files) ? files : [files];

    // Upload each file to Cloudinary
    const uploadPromises = filesArray.map((file) =>
      uploadToCloudinary(mainFolder, file, subFolder)
    );

    const fileUrls = await Promise.all(uploadPromises);

    return {
      status: "success",
      message: "Files uploaded successfully",
      fileUrls,
    };
  } catch (error) {
    throw error;
  }
};

// delete a single file
export const deleteFile = async (mainFolder, subFolder, fileName) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(
      `${mainFolder}/${subFolder}/${fileName}`
    );

    if (result.result === "ok") {
      // File deleted successfully, check if the folder is empty
      const folderResult = await cloudinary.v2.api.resources({
        type: "upload",
        prefix: `${mainFolder}/${subFolder}/`,
      });

      if (folderResult.resources.length === 0) {
        // Folder is empty, delete the folder
        await cloudinary.v2.api.delete_folder(`${mainFolder}/${subFolder}`);
      }

      return {
        status: "success",
        message: `File ${fileName} deleted successfully`,
      };
    } else {
      return {
        status: "info",
        message: "File does not exist. No actions executed",
      };
    }
  } catch (error) {
    throw error;
  }
};
