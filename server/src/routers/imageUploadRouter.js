import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import cloudinary from 'cloudinary';
import Image from '../models/imageSchema.js';
import Quiz from '../models/quizSchema.js';
import imageParser from '../middleware/cloudinary/config.js';

const imageUploadRouter = express.Router();

imageUploadRouter.post(
    "/", imageParser.single("image"), 
    expressAsyncHandler(
        async (req, res) => {
            // Upload image to cloudinary
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            console.log(result);
            let image = new Image({
                quizId: req.body.quiz_id,
                url: result.secure_url,
                cloudinaryId: result.public_id,
                fileName: req.body.file_name,
                // kind: req.body.kind,
            });
            const createdImage = await image.save();

            const quiz = await Quiz.findById(req.body.quiz_id);
            if (quiz) {
                console.log("quiz new url:", createdImage.url);
                quiz.quizImage = createdImage.url;
                const updatedQuiz = await quiz.save();
            } else {
                res.status(404).send({ message: 'Creator Not Found' });
            }
            res.send({
                message: 'Image Uploaded',
                image: createdImage,
            });
        }
    )
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