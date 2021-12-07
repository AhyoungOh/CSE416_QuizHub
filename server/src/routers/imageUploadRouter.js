import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Image from '../models/imageSchema.js';
import imageParser from '../middleware/cloudinary/config.js';

const imageUploadRouter = express.Router();

imageUploadRouter.post(
    "/", imageParser.single("image"), 
    Image
);

export default imageUploadRouter;