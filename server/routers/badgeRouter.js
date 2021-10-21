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
