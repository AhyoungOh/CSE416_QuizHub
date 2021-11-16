import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Quiz from '../../models/quizSchema.js';
import Question from '../../models/questionSchema.js';
import validUser from '../../middleware/auth/index.js';

const quizRouter = express.Router();

quizRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const createQuiz = await Quiz.find().populate({
      path: 'quizQuestions',
      model: Question,
    });
    res.send({ createQuiz });
  })
);

quizRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params._id).exec();
    res.send({ quiz });
  })
);

const addQuiz = async ({
  quizImage,
  quizName,
  quizDescription,
  createdDate,
}) => {
  try {
    await Quiz.create({
      quizImage,
      quizName,
      quizDescription,
      createdDate,
    });
  } catch (err) {
    console.error(err);
    return {};
  }
};

quizRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    await addQuiz({
      quizImage: req.body.quizImage,
      quizName: req.body.quizName,
      quizDescription: req.body.quizDescription,
      createdDate: Date.now(),
    });
    res.send('Quiz Created');
  })
);

quizRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);

    console.log(req.body);
    if (Quiz) {
      quiz.quizImage = req.body.quizImage;
      quiz.platformName = req.body.platformName;
      quiz.quizName = req.body.quizName;
      quiz.quizDescription = req.body.quizDescription;
      quiz.quizNumberOfTrials = req.body.quizNumberOfTrials;
      // quiz.quizTimeLimit = {
      //   minutes: req.body.quizTimeLimit.minutes,
      //   seconds: req.body.quizTimeLimit.seconds,
      // };
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
