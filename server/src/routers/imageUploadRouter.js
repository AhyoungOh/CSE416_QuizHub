import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Image from '../models/imageSchema.js';
import cloudinary from 'cloudinary';
import imageParser from '../middleware/cloudinary/config.js';

const imageUploadRouter = express.Router();

imageUploadRouter.post(
    "/", imageParser.single("image"), 
    async (req, res) => {
        try {
          // Upload image to cloudinary
          const result = await cloudinary.v2.uploader.upload(req.file.path);
          console.log(result);
           // Create new user
          let image = new Image({
            name: req.body.name,
            url: result.secure_url,
            cloudinary_id: result.public_id,
            folder: result.folder,
          });
          // Save user
          await image.save();
          res.json(image);
        } catch (err) {
          console.log(err);
        }
    }
);

imageUploadRouter.get("/", async (req, res) => {
    try {
      let image = await Image.find();
      res.json(image);
    } catch (err) {
      console.log(err);
    }
});

export default imageUploadRouter;