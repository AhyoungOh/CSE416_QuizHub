import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import PlatformModel from '../../models/platformSchema.js';

const router = express.Router();

const listPlatform = async () => {
  try {
    const platforms = await PlatformModel.find({}).exec();
    return platforms;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const getPlatformById = async (platformId) => {
  try {
    const platform = await PlatformModel.findOne({ id: platformId }).exec();
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

// router.get(
//   '/',
//   expressAsyncHandler(async (req, res) => {
//     const createdPlatforms = await listPlatform();
//     res.send({ createdPlatforms });
//   })
// );
router.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const createPlatform = await PlatformModel.find();
    res.send({ createPlatform });
  })
);

router.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const platform = await getPlatformById(Number(req.params._id));
    res.send({ platform });
  })
);

router.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    await addPlatform({
      platformName: req.body.title,
      platformDescription: req.body.contents,
      platformImage: req.body.imageLink,
      createdDate: Date.now(),
    });
    res.send('Platform Created');
  })
);

// router.put(
//   '/:id',
//   expressAsyncHandler(async (req, res) => {
//     await updatePlatform({
//       platformId: req.body._id,
//       title: req.body.platformName,
//       contents: req.body.platformDescription,
//       imageLink: req.body.imageLink,
//       createdDate: Date.now(),
//     });
//     res.send('Platform Updated');
//   })
// );

router.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const platformId = req.params.id;
    const platform = await PlatformModel.findById(platformId);

    console.log(req.body);
    if (PlatformModel) {
      platform.platformName = req.body.title;
      platform.platformDescription = req.body.contents;
      platform.platformImage = req.body.imageLink;
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