import { createPrivateKey } from 'crypto';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Creator from '../models/creatorSchema.js';

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
      platformName: 'Ahyoung World ',
      platformDescription: 'this is Ahyoung platform',
      platformImage: 'sample image url',
      quizId: 'sample quiz Object Id',
      createdDate: Date.now(),
      creatorImage: 'sample creator image',
      selfIntroduction: 'hi this is creator Ahyoung',
      creatorUsername: 'AhyoungOH',
      creatorEmail: 'ahyoung.oh@stonybrook.edu',
      password: 'password yes~',
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
      creator.platformName = req.body.platformName;
      creator.platformDescription = req.body.platformDescription;
      creator.platformImage = req.body.platformImage;
      creator.quizId = req.body.quizId;
      creator.createdDate = req.body.createdDate;
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

export default creatorRouter;
