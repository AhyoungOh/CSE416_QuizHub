import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Quiz from '../../models/quizSchema.js';
import Platform from '../../models/platformSchema.js';
import Question from '../../models/questionSchema.js';

const quizRouter = express.Router();

quizRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const createQuiz = await Quiz.find().populate({
      // path: '_id',
      // model: Platform,
    });
    res.send({ createQuiz });
  })
);

quizRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id).exec();
    res.send({ quiz });
  })
);

const addQuiz = async ({
  platformId,
  quizName,
  quizImage,
  createdDate,
  quizNumberOfTrials,
  quizTimeLimitMinutes,
  quizTimeLimitSeconds,
  // quizRewardType,
  // quizCertificate,
  // quizBadge,
  // quizCertificateQualification,
  // quizBadgeQualification,
  // quizEnableLeaderboard,
  // quizDescription,
}) => {
  try {
    await Quiz.create({
      platformId,
      quizName,
      quizImage,
      createdDate,
      quizNumberOfTrials,
      quizTimeLimitMinutes,
      quizTimeLimitSeconds,
      // quizRewardType,
      // quizCertificate,
      // quizBadge,
      // quizCertificateQualification,
      // quizBadgeQualification,
      // quizEnableLeaderboard,
      // quizDescription,
    });
  } catch (err) {
    console.error(err);
    return {};
  }
};

quizRouter.post('/', (req, res) => {
  try {
    console.log('req post', req.body);
    const platformId = req.body.platformId;
    const newOwendQuiz = new Quiz({
      platformId: req.body.platformId,
      quizName: req.body.quizName,
      quizImage: req.body.quizImage,
      createdDate: Date.now(),
      quizNumberOfTrials: req.body.quizNumberOfTrials,
      quizTimeLimitMinutes: req.body.quizTimeLimit.quizTimeLimitMinutes,
      quizTimeLimitSeconds: req.body.quizTimeLimit.quizTimeLimitSeconds,
      // quizRewardType: req.body.quizRewardType,
      // quizCertificate: req.body.quizCertificate,
      // quizBadge: req.body.quizBadge,
      // quizCertificateQualification: req.body.quizCertificateQualification,
      // quizBadgeQualification: req.body.quizBadgeQualification,
      // quizEnableLeaderboard: req.body.quizEnableLeaderboard,
      // quizDescription: req.body.quizDescription,
    });
    newOwendQuiz.save();
    Platform.updateOne(
      { _id: platformId },
      { $push: { ownedQuizzes: newOwendQuiz._id } },
      async (err, doc) => {
        if (err) throw err;
        if (doc) {
          res.send('Quiz Created');
        }
      }
    );
  } catch (error) {
    res.send('error');
  }
});

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
      quiz.quizTimeLimite.minutes = req.body.quizTimeLimit.minutes;
      quiz.quizTimeLimite.seoncds = req.body.quizTimeLimite.seconds;
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
