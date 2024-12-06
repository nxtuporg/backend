const express = require("express");
const multer = require("multer");
const { v2 } = require("cloudinary");
const cloudinary = v2;

const uploadImage = async (req, res) => {
  try {
    // console.log("image aayi")
    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Log uploaded file details for debugging
    console.log("Uploaded file:", req.file);

    // Respond with success message
    // res.status(200).json({
    //     message: "Image uploaded successfully",
    //     filePath: req.file.path, // Return the file path or URL for front-end usage
    // });

    (async function () {
      // Configuration
      cloudinary.config({
        cloud_name: "djycbtwhm",
        api_key: "157644546873323",
        api_secret: "iwxOfPW7-rOnQddE8AiPdk2K2ao", // Click 'View API Keys' above to copy your API secret
      });

      // Upload an image
      const uploadResult = await cloudinary.uploader
        .upload(req.file.path, {
          public_id: "images",
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(uploadResult);

      // Optimize delivery by resizing and applying auto-format and auto-quality
      const optimizeUrl = cloudinary.url("images", {
        fetch_format: "auto",
        quality: "auto",
      });
      res.status(200).json({
        message: "Image uploaded successfully",
        filePath: uploadResult.url, // Return the file path or URL for front-end usage
      });
      // console.log(optimizeUrl);

      // Transform the image: auto-crop to square aspect_ratio
      // const autoCropUrl = cloudinary.url('shoes', {
      //     crop: 'auto',
      //     gravity: 'auto',
      //     width: 500,
      //     height: 500,
      // });

      // console.log(autoCropUrl);
    })();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while uploading the image" });
  }
};

module.exports = { uploadImage };
