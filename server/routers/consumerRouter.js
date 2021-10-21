import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Consumer from '../models/consumerSchema.js';

const consumerRouter = express.Router();

//get data
consumerRouter.get(
  '/get',
  expressAsyncHandler(async (req, res) => {
    const createConsumer = await Consumer.find();
    res.send({ createConsumer });
  })
);

//post sample data
consumerRouter.post(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Consumer.remove({});
    const createConsumer = await Consumer.insertMany(data.ranking);
    res.send({ createConsumer });
  })
);

//create new data
consumerRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const consumer = new Consumer({
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
    const createdConsumer = await consumer.save();
    res.send({
      message: 'Consumer Created',
      consumer: createdConsumer,
    });
  })
);

// update
consumerRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const consumerId = req.params.id;
    const consumer = await Consumer.findById(consumerId);

    console.log(req.body);
    if (consumer) {
      consumer.username = req.body.username;
      consumer.score = req.body.score;
      consumer.minutes = req.body.minutes;
      consumer.seconds = req.body.seconds;
      consumer.isPrivate = req.body.isPrivate;
      consumer.updatedAt = req.body.updatedAt;
      const updatedConsumer = await consumer.save();
      res.send({
        message: 'Consumer Updated',
        consumer: updatedConsumer,
      });
    } else {
      res.status(404).send({ message: 'Consumer Not Found' });
    }
  })
);

consumerRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const consumer = await Consumer.findById(req.params.id);
    if (consumer) {
      const deleteConsumer = await consumer.remove();
      res.send({
        message: 'Consumer Deleted',
        consumer: deleteConsumer,
      });
    } else {
      res.status(404).send({ message: 'Consumer Not Found' });
    }
  })
);

export default consumerRouter;
