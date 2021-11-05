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
      quizImage: req.body.quizImage,
      platformName: req.body.platformName,
      quizName: req.body.quizName,
      quizDescription: req.body.quizDescription,
      quizNumberOfTrials: req.body.quizNumberOfTrials,
      quizTimeLimit: {
        minutes: req.body.quizTimeLimit.minutes,
        seconds: req.body.quizTimeLimit.seconds,
      },
      quizTotalNumberOfQuestions: req.body.quizTotalNumberOfQuestions,
      quizTotalNumberOfQuestions: req.body.quizTotalNumberOfQuestions,
      quizRewardType: req.body.quizRewardType,
      quizCertificate: req.body.quizCertificate,
      quizBadge: req.body.quizBadge,
      quizCertificateQualification: req.body.quizCertificateQualification,
      quizBadgeQualification: req.body.quizBadgeQualification,
      quizEnableLeaderboard: req.body.quizEnableLeaderboard,
      quizQuestions: req.body.quizQuestions,
      createdDate: req.body.createdDate,
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
      quiz.quizImage = req.body.quizImage;
      quiz.platformName = req.body.platformName;
      quiz.quizName = req.body.quizName;
      quiz.quizDescription = req.body.quizDescription;
      quiz.quizNumberOfTrials = req.body.quizNumberOfTrials;
      quiz.quizTimeLimit = {
        minutes: req.body.quizTimeLimit.minutes,
        seconds: req.body.quizTimeLimit.seconds,
      };
      quiz.quizTotalNumberOfQuestions = req.body.quizTotalNumberOfQuestions;
      quiz.quizRewardType = req.body.quizRewardType;
      quiz.quizCertificate = req.body.quizCertificate;
      quiz.quizBadge = req.body.quizBadge;
      quiz.quizCertificateQualification = req.body.quizCertificateQualification;
      quiz.quizBadgeQualification = req.body.quizBadgeQualification;
      quiz.quizEnableLeaderboard = req.body.quizEnableLeaderboard;
      quiz.quizQuestions = req.body.quizQuestions;
      quiz.createdDate = req.body.createdDate;

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
