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
    const createCreator = await Creator.insertMany(data.ranking);
    res.send({ createCreator });
  })
);

//create new data
creatorRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const creator = new Creator({
      username: 'sample username ',
      score: 1000,
      time: {
        minutes: 7,
        seconds: 10,
      },
      isPrivate: true,
      timestamps: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
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
      creator.username = req.body.username;
      creator.score = req.body.score;
      creator.minutes = req.body.minutes;
      creator.seconds = req.body.seconds;
      creator.isPrivate = req.body.isPrivate;
      creator.updatedAt = req.body.updatedAt;
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
