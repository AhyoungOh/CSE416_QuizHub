import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Quiz from '../models/quizSchema.js';

const quizRouter = express.Router();

//get data
quizRouter.get(
  '/get',
  expressAsyncHandler(async (req, res) => {
    const createQuiz = await Quiz.find();
    res.send({ createQuiz });
  })
);

//post sample data
quizRouter.post(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Quiz.remove({});
    const createQuiz = await Quiz.insertMany(data.quiz);
    res.send({ createQuiz });
  })
);

//create new data
quizRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const quiz = new Quiz({
      platformName: 'New York City',
      quizName: 'Landmarks in NYC',
      quizDescription: 'As a citizen in NYC, how much do you know about the landmarks in the city?',
      quizNumberOfTrials: 5,
      quizTimeLimit: {
        minutes: 20,
        seconds: 0
      }
    });
    const createdQuiz = await quiz.save();
    res.send({
      message: 'Quiz Created',
      quiz: createdQuiz,
    });
  })
);

// update
quizRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);

    console.log(req.body);
    if (quiz) {
      quiz.platformName = req.body.platformName;
      quiz.quizName = req.body.quizName;
      quiz.quizDescription = req.body.quizDescription;
      quiz.quizNumberOfTrials = req.body.quizNumberOfTrials;
      quiz.quizTimeLimit = req.body.quizTimeLimit;
      const updatedQuiz = await quiz.save();
      res.send({
        message: 'Quiz Updated',
        quiz: updatedQuiz,
      });
    } else {
      res.status(404).send({ message: 'Quiz Not Found' });
    }
  })
);

//TODO: update question

//remove
quizRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id);
    if (quiz) {
      const deleteQuiz = await quiz.remove();
      res.send({
        message: 'Quiz Deleted',
        quiz: deleteQuiz,
      });
    } else {
      res.status(404).send({ message: 'Quiz Not Found' });
    }
  })
);

export default quizRouter;
