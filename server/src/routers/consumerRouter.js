import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Consumer from '../models/consumerSchema.js';
import Quiz from '../models/quizSchema.js';
import Question from '../models/questionSchema.js';
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
    console.log(consumer);
    res.send({ consumer });
  })
);

consumerRouter.get(
  '/quizHistory/:quizId',
  validUser,
  expressAsyncHandler(async (req, res) => {
    const quizId = req.params.quizId;
    const result = req.consumer.consumerQuizHistoryList.filter(
      (consumerQuizHistory) => {
        return quizId === consumerQuizHistory.quizId;
      }
    );
    res.send(result);
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
consumerRouter.put('/:id', async (req, res) => {
  const consumerId = req.params.id;
  const consumer = await Consumer.findById(consumerId);

  console.log('req', req.body);
  if (consumer) {
    if (req.body.consumerDescription !== '') {
      consumer.consumerDescription = req.body.consumerDescription;
    }
    if (req.body.consumerImage !== '') {
      consumer.consumerImage = req.body.consumerImage;
    }
    if (req.body.consumerEmail !== '') {
      consumer.consumerEmail = req.body.consumerEmail;
    }
    if (req.body.consumerPassword !== '') {
      consumer.password = req.body.consumerPassword;
    }
    consumer.consumerIsPrivate = req.body.consumerIsPrivate;

    const updatedConsumer = await consumer.save();
    res.send({
      message: 'Consumer Updated',
      consumer: updatedConsumer,
    });
  } else {
    res.status(404).send({ message: 'Consumer Not Found' });
  }
});

consumerRouter.post('/quiz', validUser, async (req, res) => {
  const consumer = req.consumer;
  // if (consumer) {
  // consumer.consumerQuizHistoryList.push(req.body.quizzes);
  const quiz = await Quiz.findById(req.body.quizzes.quizId).populate({
    path: 'quizQuestions',
    model: Question,
  });
  const submittedAnswers = req.body.quizzes.answerchoices;
  const matchedQuizIndex = consumer.consumerQuizHistoryList.findIndex(
    (quizHistory) => quizHistory.quizId === req.body.quizzes.quizId
  );

  if (matchedQuizIndex === -1) {
    const answers = quiz.quizQuestions.map((quiz) => quiz.questionAnswer);
    let correctedAnswerNum = 0;
    for (let i = 0; i < answers.length; i++) {
      if (submittedAnswers[i] === answers[i] - 1) correctedAnswerNum++;
    }

    consumer.consumerQuizHistoryList.push({
      ...req.body.quizzes,
      correctedAnswerNum,
    });
    const updatedConsumer = await consumer.save();
    res.send({
      message: 'Consumer Updated',
      consumer: updatedConsumer,
    });
    return;
  }
  const matchedQuiz = consumer.consumerQuizHistoryList[matchedQuizIndex];
  const originAnswers = matchedQuiz?.answerchoices;
  const answers = quiz.quizQuestions.map((quiz) => quiz.questionAnswer);
  let submittedCorrectedAnswerNum = 0;
  let originCorrectedAnswerNum = 0;
  for (let i = 0; i < answers.length; i++) {
    if (submittedAnswers[i] === answers[i]) submittedCorrectedAnswerNum++;
    if (originAnswers[i] === answers[i]) originCorrectedAnswerNum++;
  }

  if (submittedCorrectedAnswerNum >= originCorrectedAnswerNum) {
    consumer.consumerQuizHistoryList[matchedQuizIndex] = {
      ...req.body.quizzes,
      correctedAnswerNum: submittedCorrectedAnswerNum,
    };
  }

  const updatedConsumer = await consumer.save();
  res.send({
    message: 'Consumer Updated',
    consumer: updatedConsumer,
  });
});

consumerRouter.put('/quiz/:id', validUser, async (req, res) => {
  const id = req.params.id;
  const consumer = req.consumer;
  const quiz = await Quiz.findById(req.body.quizzes.quizId).populate({
    path: 'quizQuestions',
    model: Question,
  });
  const quizHistoryIdx = consumer.consumerQuizHistoryList.findIndex((e) => {
    return e.quizId === id;
  });
  const submittedAnswers = req.body.quizzes.answerchoices;

  const answers = quiz.quizQuestions.map((quiz) => quiz.questionAnswer);
  let correctedAnswerNum = 0;
  for (let i = 0; i < answers.length; i++) {
    console.log('submitted answer: ', submittedAnswers[i] + 1);
    console.log('answers: ', answers[i]);
    if (submittedAnswers[i] + 1 === answers[i]) correctedAnswerNum++;
  }

  consumer.consumerQuizHistoryList[quizHistoryIdx] = {
    ...consumer.consumerQuizHistoryList[quizHistoryIdx],
    answerchoices: req.body.quizzes.answerchoices,
    quizTimeTaken: req.body.quizzes.quizTimeTaken,
    accomplishedDate: req.body.quizzes.accomplishedDate,
    correctedAnswerNum,
  };

  const updatedConsumer = await consumer.save();
  res.send({
    message: 'Consumer Updated',
    consumer: updatedConsumer,
  });
});

consumerRouter.put('/quiz/trial/:id', validUser, async (req, res) => {
  const id = req.params.id;
  const consumer = req.consumer;
  const quizHistoryIdx = consumer.consumerQuizHistoryList.findIndex((e) => {
    return e.quizId === id;
  });

  consumer.consumerQuizHistoryList[quizHistoryIdx] = {
    ...consumer.consumerQuizHistoryList[quizHistoryIdx],
    usedTrialNumber:
      consumer.consumerQuizHistoryList[quizHistoryIdx].usedTrialNumber + 1,
  };

  const updatedConsumer = await consumer.save();
  res.send({
    message: 'Consumer Updated',
    consumer: updatedConsumer,
  });
});

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
