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
    const createConsumer = await Consumer.insertMany(data.consumer);
    res.send({ createConsumer });
  })
);

//create new data
consumerRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const consumer = new Consumer({
      consumerDescription: req.body.consumerDescription,
      consumerImage: req.body.consumerImage,
      consumerUsername: req.body.consumerUsername,
      consumerEmail: req.body.consumerEmail,
      password: req.body.password,
      consumerIsPrivate: req.body.consumerIsPrivate,
      // consumerQuizHistoryList: [
      //   {
      //     Quizzes: {
      //       correctNumber:
      //         req.body.consumerQuizHistoryList.Quizzes.correctNumber,
      //       quizTimeTaken: {
      //         minutes:
      //           req.body.consumerQuizHistoryList.Quizzes.quizTimeTaken.minutes,
      //         seconds:
      //           req.body.consumerQuizHistoryList.Quizzes.quizTimeTaken.seconds,
      //       },
      //       accomplishedDate:
      //         req.body.consumerQuizHistoryList.Quizzes.accomplishedDate,
      //       usedTrialNumber:
      //         req.body.consumerQuizHistoryList.Quizzes.usedTrialNumber,
      //     },
      //   },
      // ],
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
      // consumer.consumerIsPrivate = req.body.consumerIsPrivate;
      // consumer.consumerQuizHistoryList.Quizzes.correctNumber =
      //   req.body.consumerQuizHistoryList.Quizzes.correctNumber;
      // consumer.consumerQuizHistoryList.Quizzes.quizTimeTake.minutes =
      //   req.body.consumerQuizHistoryList.Quizzes.quizTimeTaken.minutes;
      // consumer.consumerQuizHistoryList.Quizzes.quizTimeTake.seconds =
      //   req.body.consumerQuizHistoryList.Quizzes.quizTimeTaken.seconds;
      // consumer.consumerQuizHistoryList.Quizzes.accomplishedDate =
      //   req.body.consumerQuizHistoryList.Quizzes.accomplishedDate;
      // consumer.consumerQuizHistoryList.Quizzes.usedTrialNumber =
      //   req.body.consumerQuizHistoryList.Quizzes.usedTrialNumber;
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
