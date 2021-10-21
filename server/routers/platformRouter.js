import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Platform from '../models/platformSchema.js';

const platformRouter = express.Router();

//get data
platformRouter.get(
  '/get',
  expressAsyncHandler(async (req, res) => {
    const createPlatform = await Platform.find();
    res.send({ createPlatform });
  })
);

//post sample data
platformRouter.post(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Platform.remove({});
    const createPlatform = await Platform.insertMany(data.ranking);
    res.send({ createPlatform });
  })
);

//create new data
platformRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const platform = new Platform({
      platformName: 'Ahyoung platform',
      platformDescription: 'this is Ahyoung platform',
      platformImage: 'sample url for image',
      ownedQuizzes: {
        quizId: 'sample quiz Object ID',
      },
      createdDate: Date.now(),
    });
    const createdPlatform = await platform.save();
    res.send({
      message: 'Platform Created',
      platform: createdPlatform,
    });
  })
);

// update
platformRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const platformId = req.params.id;
    const platform = await Platform.findById(platformId);

    console.log(req.body);
    if (platform) {
      platform.platformName = req.body.platformName;
      platform.platformDescription = req.body.platformDescription;
      platform.platformImage = req.body.platformImage;
      platform.quizId = req.body.quizId;
      const updatedPlatform = await platform.save();
      res.send({
        message: 'Platform Updated',
        platform: updatedPlatform,
      });
    } else {
      res.status(404).send({ message: 'Platform Not Found' });
    }
  })
);

platformRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const platform = await Platform.findById(req.params.id);
    if (platform) {
      const deletePlatform = await platform.remove();
      res.send({
        message: 'Platform Deleted',
        platform: deletePlatform,
      });
    } else {
      res.status(404).send({ message: 'Platform Not Found' });
    }
  })
);

export default platformRouter;