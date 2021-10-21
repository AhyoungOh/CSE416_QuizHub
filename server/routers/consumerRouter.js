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
      consumerDescription: 'sample description',
      consumerImage: 'sample image url',
      consumerUsername: 'consumer Ahyoung',
      consumerEmail: 'ahyoung.oh@stonybrook.edu',
      password: 'password',
      consumerIsPrivate: 'false',
      consumerQuizHistoryList: [
        {
          Quizzes: {
            quizId: 'sample object Id',
            correctNumber: 10,
            quizTimeTaken: {
              minutes: 50,
              seconds: 100,
            },
            accomplishedDate: '2021-10-21',
            usedTrialNumber: 2,
          },
        },
      ],
      badges: [
        {
          badgeId: 'sample badge objectId',
          accomplishedDate: '2021-09-09',
          badgeVisibility: true,
        },
      ],
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
      consumer.consumerDescription = req.body.consumerDescription;
      consumer.consumerImage = req.body.consumerImage;
      consumer.consumerUsername = req.body.consumerUsername;
      consumer.consumerEmail = req.body.consumerEmail;
      consumer.password = req.body.password;
      consumer.consumerIsPrivate = req.body.consumerIsPrivate;
      consumer.quizId = req.body.quizId;
      consumer.correctNumber = req.body.correctNumber;
      consumer.minutes = req.body.consumerUsername;
      consumer.seconds = req.body.consumerEmail;
      consumer.accomplishedDate = req.body.accomplishedDate;
      consumer.usedTrialNumber = req.body.usedTrialNumber;
      consumer.certificatedId = req.body.certificatedId;
      consumer.accomplishedDate = req.body.accomplishedDate;
      consumer.badgeId = req.body.badgeId;
      consumer.accomplishedDate = req.body.accomplishedDate;
      consumer.badgeVisibility = req.body.badgeVisibility;
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
