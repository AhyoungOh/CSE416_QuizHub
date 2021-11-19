import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Consumer from '../models/consumerSchema.js';
import validUser from '../middleware/auth/index.js';
const consumerRouter = express.Router();

//get data
consumerRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const createConsumer = await Consumer.find();
    res.send({ createConsumer });
  })
);

consumerRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const consumer = await findById(Number(req.params.id));
    res.send({ consumer });
  })
);

//create new data
consumerRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const consumer = new Consumer({
      consumerDescription: req.body.consumerDescription,
      consumerImage: req.body.consumerImage,
      consumerUsername: req.body.consumerUsername,
      consumerEmail: req.body.consumerEmail,
      password: req.body.password,
      consumerIsPrivate: req.body.consumerIsPrivate,
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
      consumer.consumerIsPrivate = req.body.consumerDescription;
      consumer.consumerImage = req.body.consumerImage;
      consumer.consumerUsername = req.body.consumerUsername;
      consumer.consumerEmail = req.body.consumerEmail;
      consumer.password = req.body.password;
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

consumerRouter.post(
  '/quiz',
  validUser,
  expressAsyncHandler(async (req, res) => {
    const consumerId = req.consumer._id;
    const consumer = await Consumer.findById(consumerId);
    if (consumer) {
      console.log(req.body.quizzes);
      consumer.consumerQuizHistoryList.push(req.body.quizzes);

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
