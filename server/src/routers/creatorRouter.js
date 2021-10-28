// import { createPrivateKey } from 'crypto';
const express = require('express');
const router = express.Router();
const Creator = require('../models/creatorSchema.js');
// const { validUser } = require('../middleware/creator');
const expressAsyncHandler = require('express-async-handler');

const creatorRouter = express.Router();

//get data
creatorRouter.get(
  '/get',
  expressAsyncHandler(async (req, res) => {
    const createCreator = await Creator.find();
    res.send({ createCreator });
  })
);

//post sample data
creatorRouter.post(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Creator.remove({});
    const createCreator = await Creator.insertMany(data.creator);
    res.send({ createCreator });
  })
);

//create new data
creatorRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const creator = new Creator({
      creatorImage: req.body.creatorImage,
      selfIntroduction: req.body.selfIntroduction,
      creatorUsername: req.body.creatorUsername,
      creatorEmail: req.body.creatorEmail,
      password: req.body.password,
    });
    const createdCreator = await creator.save();
    res.send({
      message: 'Creator Created',
      creator: createdCreator,
    });
  })
);

// update
creatorRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const creatorId = req.params.id;
    const creator = await Creator.findById(creatorId);

    console.log(req.body);
    if (creator) {
      // for ownedplatformid it will be dealed by additional function like addPlatform()
      creator.creatorImage = req.body.creatorImage;
      creator.selfIntroduction = req.body.selfIntroduction;
      creator.creatorUsername = req.body.creatorUsername;
      creator.creatorEmail = req.body.creatorEmail;
      creator.password = req.body.password;
      const updatedCreator = await creator.save();
      res.send({
        message: 'Creator Updated',
        creator: updatedCreator,
      });
    } else {
      res.status(404).send({ message: 'Creator Not Found' });
    }
  })
);

creatorRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const creator = await Creator.findById(req.params.id);
    if (creator) {
      const deleteCreator = await creator.remove();
      res.send({
        message: 'Creator Deleted',
        creator: deleteCreator,
      });
    } else {
      res.status(404).send({ message: 'Creator Not Found' });
    }
  })
);

// export default creatorRouter;
// ``;
module.exports = router;
