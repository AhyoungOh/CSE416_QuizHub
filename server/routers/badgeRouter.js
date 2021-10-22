import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Badge from '../models/badgeSchema.js';

const badgeRouter = express.Router();

//get data
badgeRouter.get(
  '/get',
  expressAsyncHandler(async (req, res) => {
    const createBadge = await Badge.find();
    res.send({ createBadge });
  })
);

//post sample data
badgeRouter.post(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Badge.remove({});
    const createBadge = await Badge.insertMany(data.badge);
    res.send({ createBadge });
  })
);

//create new data
badgeRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const badge = new Badge({
      badgeRasterizedContentUrl: req.body.badgeRasterizedContentUrl,
      badgeEncodedContent: req.body.badgeEncodedContent,
      badgeUploadFile: req.body.badgeUploadFile,
      badgeRequirementsAccuracy: req.body.badgeRequirementsAccuracy,
    });
    const createdBadge = await badge.save();
    res.send({
      message: 'Badge Created',
      badge: createdBadge,
    });
  })
);

// update
badgeRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const badgeId = req.params.id;
    const badge = await Badge.findById(badgeId);

    console.log(req.body);
    if (Badge) {
      badge.badgeRasterizedContentUrl = req.body.badgeRasterizedContentUrl;
      badge.badgeEncodedContent = req.body.badgeEncodedContent;
      badge.badgeUploadFile = req.body.badgeUploadFile;
      badge.badgeRequirementsAccuracy = req.body.badgeRequirementsAccuracy;
      const updatedBadge = await badge.save();
      res.send({
        message: 'Badge Updated',
        Badge: updatedBadge,
      });
    } else {
      res.status(404).send({ message: 'Badge Not Found' });
    }
  })
);

badgeRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const badge = await Badge.findById(req.params.id);
    if (badge) {
      const deleteBadge = await badge.remove();
      res.send({
        message: 'Badge Deleted',
        badge: deleteBadge,
      });
    } else {
      res.status(404).send({ message: 'Badge Not Found' });
    }
  })
);

export default badgeRouter;
