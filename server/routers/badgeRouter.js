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
    const createBadge = await Badge.insertMany(data.ranking);
    res.send({ createBadge });
  })
);

//create new data
badgeRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const badge = new Badge({
      badgeRasterizedContentUrl: 'sample Url',
      badgeEncodedContent: 'sample encoded content',
      badgeUploadFile: 'sample file',
      badgeRequirementsAccuracy: 100,
    });
    const createdBadge = await badge.save();
    res.send({
      message: 'Badge Created',
      badge: createdBadge,
    });
  })
);

// update -> no needed for badge
// badgeRouter.put(
//   '/:id',
//   expressAsyncHandler(async (req, res) => {
//     const badgeId = req.params.id;
//     const badge = await Badge.findById(badgeId);

//     console.log(req.body);
//     if (badge) {
//       badge.badgeRasterizedContentUrl = req.body.badgeRasterizedContentUrl;
//       badge.badgeEncodedContet = req.body.badgeEncodedContent;
//       badge.UploadFile = req.body.UploadFile;
//       badge.RequirementsAccuracy = req.body.RequirementsAccuracy;
//       const updatedBadge = await badge.save();
//       res.send({
//         message: 'Badge Updated',
//         badge: updatedBadge,
//       });
//     } else {
//       res.status(404).send({ message: 'Badge Not Found' });
//     }
//   })
// );

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
