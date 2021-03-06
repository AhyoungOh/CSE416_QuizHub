import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Question from '../../models/questionSchema.js';
import Quiz from '../../models/quizSchema.js';

const questionRouter = express.Router();

//get data
questionRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const createQuestion = await Question.find();
    res.send({ createQuestion });
  })
);

//create new data
questionRouter.post('/:id', (req, res) => {
  // console.log(req.body.questionOption2);
  try {
    const newQuestion = new Question({
      quizId: req.body.quizId,
      questionNumber: req.body.questionNumber,
      questionQuestion: req.body.questionQuestion,
      questionOption1: req.body.questionOption1,
      questionOption2: req.body.questionOption2,
      questionOption3: req.body.questionOption3,
      questionOption4: req.body.questionOption4,
      questionOptions: [
        req.body.questionOption1,
        req.body.questionOption2,
        req.body.questionOption3,
        req.body.questionOption4,
      ],
      questionAnswer: req.body.questionAnswer,
    });
    newQuestion.save();
    console.log('newQuestion', newQuestion);
    const newQuestionId = newQuestion._id;
    Quiz.updateOne(
      { _id: req.body.quizId },
      { $push: { quizQuestions: newQuestionId } },
      async (err, doc) => {
        if (err) throw err;
        if (doc) {
          res.send('Question Created');
        }
      }
    );
  } catch (error) {
    res.send('err');
  }
});

// update
questionRouter.put(
  '/detail/:id',
  expressAsyncHandler(async (req, res) => {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);
    if (question) {
      // question.questionNumber = req.body.questionNumber;
      question.questionQuestion = req.body.questionQuestion;
      question.questionNumber = req.body.questionNumber;
      question.questionOption1 = req.body.questionOption1;
      question.questionOption2 = req.body.questionOption2;
      question.questionOption3 = req.body.questionOption3;
      question.questionOption4 = req.body.questionOption4;
      question.questionOptions[0] = req.body.questionOption1;
      question.questionOptions[1] = req.body.questionOption2;
      question.questionOptions[2] = req.body.questionOption3;
      question.questionOptions[3] = req.body.questionOption4;
      question.questionAnswer = req.body.questionAnswer;
      const updatedQuestion = await question.save();
      // console.log('update question', updatedAuestion);
      res.send({
        message: 'Question Updated',
        question: updatedQuestion,
      });
    } else {
      res.status(404).send({ message: 'Question Not Found' });
    }
  })
);

// update question number only
questionRouter.put(
  '/detail_num/:id',
  expressAsyncHandler(async (req, res) => {
    const questionId = req.params.id;
    const question = await Question.findById(questionId);
    if (question) {
      question.questionNumber = req.body.questionNumber;
      const updatedQuestion = await question.save();
      res.send({
        message: 'Question Updated',
        question: updatedQuestion,
      });
    } else {
      res.status(404).send({ message: 'Question (Number) Not Found' });
    }
  })
);

//remove
questionRouter.delete(
  '/detail/:id',
  expressAsyncHandler(async (req, res) => {
    try {
      const questionId = req.params.id;
      const question = await Question.findById(questionId);
      const deletedNumber = question.questionNumber;
      const quizId = question.quizId;
      const quiz = await Quiz.findById(quizId);
      Question.deleteOne({ _id: req.params.id }, async (err, doc) => {
        if (err) throw err;
        if (doc) {
          res.send('Question Deleted');
        }
      });

      Quiz.updateOne(
        { _id: quizId },
        { $pull: { quizQuestions: questionId } },
        async (err, doc) => {
          if (err) throw err;
          if (doc) {
            res.send('Quiz Updated');
          }
        }
      );

      // quiz.quizQuestions.updateMany(
      //   -{
      //     _id: quiz.quizQuestions.valueOf(),
      //     questionNumber: { $gt: deletedNumber },
      //   },
      //   { $inc: { questionNumber: -1 } },
      //   async (err, doc) => {
      //     if (err) throw err;
      //     if (doc) {
      //       res.send('Quiz Updated');
      //     }
      //   }
      // );

      quiz.quizQuestions.map(async (el) => {
        // console.log('el.valueOf()', el.valueOf());
        if (el.valueOf() != questionId) {
          const getquestioninfo = await Question.findById(el.valueOf());
          // console.log('getinfo', getquestioninfo);
          if (getquestioninfo.questionNumber > deletedNumber) {
            const result = await Question.updateOne(
              { _id: getquestioninfo.id },
              { $inc: { questionNumber: -1 } }
            );
          }
        }
      });
      // quiz.quizQuestions.findById().updateMany(
      //   { questionNumber: { $gt: deletedNumber } },
      //   { $set: { questionNumber: 1 } }
      // );
    } catch (error) {
      res.send('err');
    }
  })
);

export default questionRouter;
