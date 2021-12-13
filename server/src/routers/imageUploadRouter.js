import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import cloudinary from 'cloudinary';
import Image from '../models/imageSchema.js';
import Quiz from '../models/quizSchema.js';
import Platform from '../models/platformSchema.js';
import Consumer from '../models/consumerSchema.js';
import Creator from '../models/creatorSchema.js';
import imageParser from '../middleware/cloudinary/config.js';
import avatarParser from '../middleware/cloudinary/avatarconfig.js';

const imageUploadRouter = express.Router();

// quiz image
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

// platform image
imageUploadRouter.post(
    "/platform", avatarParser.single("image"), 
    expressAsyncHandler(
        async (req, res) => {
            // Upload image to cloudinary
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            console.log(result);
            let image = new Image({
                platformId: req.body.platform_id,
                url: result.secure_url,
                cloudinaryId: result.public_id,
                fileName: req.body.file_name,
            });
            const createdImage = await image.save();

            const platform = await Platform.findById(req.body.platform_id);
            if (platform) {
                console.log("platform new url:", createdImage.url);
                platform.platformImage = createdImage.url;
                const updatedPlatform = await platform.save();
            } else {
                res.status(404).send({ message: 'Platform Not Found' });
            }
            res.send({
                message: 'Platform Avatar Uploaded',
                image: createdImage,
            });
        }
    )
);

// consumer image
imageUploadRouter.post(
    "/consumer", avatarParser.single("image"), 
    expressAsyncHandler(
        async (req, res) => {
            // Upload image to cloudinary
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            console.log(result);
            let image = new Image({
                consumerId: req.body.consumer_id,
                url: result.secure_url,
                cloudinaryId: result.public_id,
                fileName: req.body.file_name,
            });
            const createdImage = await image.save();

            const consumer = await Consumer.findById(req.body.consumer_id);
            if (consumer) {
                console.log("consumer new url:", createdImage.url);
                consumer.consumerImage = createdImage.url;
                const updatedConsumer= await consumer.save();
            } else {
                res.status(404).send({ message: 'Consumer Not Found' });
            }
            res.send({
                message: 'Consumer Avatar Uploaded',
                image: createdImage,
            });
        }
    )
);

// creator image
imageUploadRouter.post(
    "/creator", avatarParser.single("image"), 
    expressAsyncHandler(
        async (req, res) => {
            // Upload image to cloudinary
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            console.log(result);
            let image = new Image({
                creatorId: req.body.creator_id,
                url: result.secure_url,
                cloudinaryId: result.public_id,
                fileName: req.body.file_name,
            });
            const createdImage = await image.save();

            const creator = await Creator.findById(req.body.creator_id);
            if (creator) {
                console.log("creator new url:", createdImage.url);
                creator.creatorImage = createdImage.url;
                const updatedCreator= await creator.save();
            } else {
                res.status(404).send({ message: 'Creator Not Found' });
            }
            res.send({
                message: 'Creator Avatar Uploaded',
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