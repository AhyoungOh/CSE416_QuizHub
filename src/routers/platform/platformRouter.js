import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import PlatformModel from '../../models/platformSchema.js';
import Creator from '../../models/creatorSchema.js';
import Quiz from '../../models/quizSchema.js';
import validUser from '../../middleware/auth/index.js';
import creatorSchema from '../../models/creatorSchema.js';
import mongoose from 'mongoose';
const router = express.Router();

const getPlatformById = async (platformId) => {
  try {
    const platform = await PlatformModel.findOne({ _id: platformId })
      .populate({ path: 'ownedQuizzes', model: 'Quiz' })
      .exec();
    return platform;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const addPlatform = async ({
  platformName,
  platformDescription,
  platformImage,
  createdDate,
}) => {
  try {
    await PlatformModel.create({
      platformName,
      platformDescription,
      platformImage,
      createdDate,
    });
  } catch (err) {
    console.error(err);
    return {};
  }
};

const updatePlatform = async ({
  platformId,
  platformName,
  platformDescription,
  platformImage,
  createdDate,
}) => {
  try {
    const query = { _id: platformId };
    await PlatformModel.updateOne(query, {
      platformName,
      platformDescription,
      platformImage,
      createdDate,
    }).exec();
  } catch (err) {
    console.error(err);
    return {};
  }
};

const deletePlatform = async ({ platformId }) => {
  try {
    const query = { _id: platformId };
    await PlatformModel.deleteOne(query).exec();
  } catch (err) {
    console.error(err);
    return {};
  }
};

router.get(
  '/',
  validUser,
  expressAsyncHandler(async (req, res) => {
    // console.log('req.creator.platformid', req.creator.ownedPlatformId);
    // console.log(req.session._ctx.creator._id);
    const createPlatform = await PlatformModel.find({
      _id: req.creator.ownedPlatformId,
    }).populate({
      path: 'ownedQuizzes',
      model: Quiz,
    });
    res.send({ createPlatform });
  })
);

router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const platform = await PlatformModel.findById(req.params._id)
      //.populate('ownedQuizzes')
      .exec();
    // const platform = await getPlatformById(Number(req.params._id));
    res.send({ platform });
  })
);

router.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    // console.log('req', req.body.creatorId);
    try {
      const newPlatform = new PlatformModel({
        platformName: req.body.platformName,
        creatorId: req.body.creatorId,
        platformDescription: req.body.platformDescription,
        platformImage: req.body.platformImage,
        createdDate: Date.now(),
      });
      newPlatform.save();
      const newPlatformId = newPlatform._id;
      const creator = await Creator.findById(req.body.creatorId);
      if (creator) {
        creator.ownedPlatformId.push(newPlatform);
        const updatedCreator = await creator.save();
        res.send({
          message: 'creator updated',
          creator: updatedCreator,
        });
      } else {
        res.status(404).send({ message: 'Creator Now Found' });
      }
    } catch (error) {
      res.send('error');
    }
  })
);

router.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const platformId = req.params.id;
    const platform = await PlatformModel.findById(platformId);

    if (PlatformModel) {
      platform.platformName = req.body.platformName;
      platform.platformDescription = req.body.platformDescription;
      platform.platformImage = req.body.platformImage;
      platform.createdDate = Date.now();
      const updatedPlatform = await platform.save();
      res.send({
        message: 'Platform Updated',
        PlatformModel: updatedPlatform,
      });
    } else {
      res.status(404).send({ message: 'Platform Not Found' });
    }
  })
);

router.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    await deletePlatform({ platformId: req.params.id });
    res.send('Platform Deleted');
  })
);

export default router;
