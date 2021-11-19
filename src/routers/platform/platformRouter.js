import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Platform from '../../models/platformSchema.js';
import Quiz from '../../models/quizSchema.js';
import creatorSchema from '../../models/creatorSchema.js';
import validUser from '../../middleware/auth/index.js';
const router = express.Router();

const getPlatformById = async (platformId) => {
  try {
    const platform = await Platform.findOne({ _id: platformId })
      .populate({ path: 'ownedQuizzes', model: 'Quiz' })
      .exec();
    return platform;
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
    await Platform.updateOne(query, {
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
    await Platform.deleteOne(query).exec();
  } catch (err) {
    console.error(err);
    return {};
  }
};

router.get(
  '/',
  validUser,
  expressAsyncHandler(async (req, res) => {
    // console.log('req.creator id', req.creator.ownedPlatformId);
    const createPlatform = await Platform.find({
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
    const platform = await Platform.findById(req.params._id)
      //.populate('ownedQuizzes')
      .exec();
    // const platform = await getPlatformById(Number(req.params._id));
    res.send({ platform });
  })
);

router.post(
  '/',
  validUser,
  expressAsyncHandler(async (req, res) => {
    try {
      console.log('req, creator', req.creator);
      console.log('req, body', req.body);
      const newPlatform = new Platform({
        platformName: req.body.platformName,
        platformDescription: req.body.platformDescription,
        platformImage: req.body.platformImage,
        createdDate: Date.now(),
      });
      console.log('newplatform', newPlatform);
      newPlatform.save();
      const newPlatformId = newPlatform._id;
      const Creator = mongoose.model('Creator', creatorSchema);
      Creator.updateOne(
        { _id: req.body.creatorId },
        { $push: { ownedPlatformId: newPlatformId } }
      );
    } catch (error) {
      res.send('create error');
    }
  })
);

router.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const platformId = req.params.id;
    const platform = await Platform.findById(platformId);

    if (Platform) {
      platform.platformName = req.body.platformName;
      platform.platformDescription = req.body.platformDescription;
      platform.platformImage = req.body.platformImage;
      platform.createdDate = Date.now();
      const updatedPlatform = await platform.save();
      res.send({
        message: 'Platform Updated',
        Platform: updatedPlatform,
      });
    } else {
      res.status(404).send({ message: 'Platform Not Found' });
    }
  })
);

router.delete('/:id', (req, res) => {
  try {
    const creatorId = req.body.creatorId;
    Platform.deleteOne({ _id: req.params.id }, async (err, doc) => {
      if (err) throw err;
      if (doc) {
        res.send('Platform Deleted');
      }
    });
    Creator.updateOne(
      { _id: creatorId },
      { $pull: { ownedPlatformId: req.params.id } },
      async (err, doc) => {
        if (err) throw err;
        if (doc) {
          res.send('Creator Updated');
        }
      }
    );
  } catch (error) {
    res.send('err');
  }
});

export default router;
