import express from 'express';
import expressAsyncHandler from 'express-async-handler';
//import data from '../../data.js';
import Consumer from '../models/consumerSchema.js';
import Badge from '../models/badgeSchema.js';

const badgeRouter = express.Router();

//get data
badgeRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const createBadge = await Badge.find();
    res.send({ createBadge });
  })
);

badgeRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const badge = await Badge.findById(req.params.id);
    res.send({ badge });
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
  '/',
  expressAsyncHandler(async (req, res) => {
    const badge = new Badge({
      badgeRasterizedContentUrl: req.body.badgeRasterizedContentUrl,
      badgeEncodedContent: req.body.badgeEncodedContent,
      badgeUploadFile: req.body.badgeUploadFile,
      consumerId: req.body.consumerId,
      badgeRequirementsAccuracy: req.body.badgeRequirementsAccuracy,
    });
    const createdBadge = await badge.save();
    const consumer = await Consumer.findById(req.body.consumerId);
    const updatedBadge = {
      badgeId: createdBadge._id,
      badgeVisibility: true,
    }
    if (consumer) {
      consumer.badges.push(updatedBadge);
      const updatedConsumer = await consumer.save();
    } else {
      res.status(404).send({ message: 'Creator Not Found' });
    }
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
