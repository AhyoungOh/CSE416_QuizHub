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
      path: 'quizQuestions',
      model: Question,
    });
    res.send({ createQuiz });
  })
);

quizRouter.get(
  '/detail/:id',
  expressAsyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.id).populate({
      path: 'quizQuestions',
      model: Question,
    });
    res.send({ quiz });
  })
);

quizRouter.post('/:id', (req, res) => {
  try {
    const newQuiz = new Quiz({
      platformId: req.body.platformId,
      quizImage: req.body.quizImage,
      quizName: req.body.quizName,
      createdDate: Date.now(),
      quizNumberOfTrials: req.body.quizNumberOfTrials,
      quizTimeLimit: {
        minutes: req.body.quizTimeLimitMinutes,
        seconds: req.body.quizTimeLimitSeconds,
      },
      quizRewardType: req.body.quizRewardType,
      // quizCertificate: req.body.quizCertificate,
      // quizBadge: req.body.quizBadge,
      quizCertificateQualification: req.body.quizCertificateQualification,
      quizBadgeQualification: req.body.quizBadgeQualification,
      // quizEnableLeaderboard: req.body.quizEnableLeaderboard,
      quizDescription: req.body.quizDescription,
    });
    newQuiz.save();
    const newQuizId = newQuiz._id;
    Platform.updateOne(
      { _id: req.body.platformId },
      { $push: { ownedQuizzes: newQuizId } },
      async (err, doc) => {
        if (err) throw err;
        if (doc) {
          res.send('Quiz Created');
        }
      }
    );
  } catch (error) {
    res.send('err');
  }
});

quizRouter.put(
  '/detail/:id',
  expressAsyncHandler(async (req, res) => {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);

    console.log(req.body);
    if (Quiz) {
      quiz.platformId = req.body.platformId;
      quiz.quizImage = req.body.quizImage;
      quiz.quizName = req.body.quizName;
      quiz.createdDate = Date.now();
      quiz.quizNumberOfTrials = req.body.quizNumberOfTrials;
      quiz.quizTimeLimit = {
        minutes: req.body.quizTimeLimitMinutes,
        seconds: req.body.quizTimeLimitSeconds,
      };
      quiz.quizRewardType = req.body.quizRewardType;
      // quiz.quizCertificate = req.body.quizCertificate;
      // quiz.quizBadge = req.body.quizBadge;
      quiz.quizCertificateQualification = req.body.quizCertificateQualification;
      quiz.quizBadgeQualification = req.body.quizBadgeQualification;
      // quiz.quizEnableLeaderboard = req.body.quizEnableLeaderboard;
      quiz.quizDescription = req.body.quizDescription;

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

quizRouter.delete('/detail/:id', (req, res) => {
  try {
    const platformId = req.body.platformId;
    Quiz.deleteOne({ _id: req.params.id }, async (err, doc) => {
      if (err) throw err;
      if (doc) {
        res.send('Quiz Deleted');
      }
    });
    Platform.updateOne(
      { _id: platformId },
      { $pull: { ownedQuizzes: req.params.id } },
      async (err, doc) => {
        if (err) throw err;
        if (doc) {
          res.send('Platform Updated');
        }
      }
    );
  } catch (error) {
    res.send('err');
  }
});

export default quizRouter;
