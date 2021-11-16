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
  try {
    const newQuestion = new Question({
      quizId: req.body.quizId,
      questionNumber: req.body.questionNumber,
      questionQuestion: req.body.questionQuestion,
      questionOptions: req.body.questionOptions,
      questionAnswer: req.body.questionAnswer,
    });
    newQuestion.save();
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

    console.log(req.body);
    if (question) {
      question.questionNumber = req.body.questionNumber;
      question.questionQuestion = req.body.questionQuestion;
      question.questionOptions = req.body.questionOptions;
      question.questionAnswer = req.body.questionAnswer;

      const updatedQuestion = await question.save();
      res.send({
        message: 'Question Updated',
        question: updatedQuestion,
      });
    } else {
      res.status(404).send({ message: 'Question Not Found' });
    }
  })
);

//remove
questionRouter.delete('/detail/:id', (req, res) => {
  try {
    const quizId = req.body.quizId;
    Question.deleteOne({ _id: req.params.id }, async (err, doc) => {
      if (err) throw err;
      if (doc) {
        res.send('Question Deleted');
      }
    });
    Quiz.updateOne(
      { _id: quizId },
      { $pull: { quizQuestions: req.params.id } },
      async (err, doc) => {
        if (err) throw err;
        if (doc) {
          res.send('Quiz Updated');
        }
      }
    );
  } catch (error) {
    res.send('err');
  }
});

export default questionRouter;
