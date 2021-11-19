import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

// import routers
import creatorRouter from './src/routers/creatorRouter.js';
import platformRouter from './src/routers/platform/platformRouter.js';
import consumerRouter from './src/routers/consumerRouter.js';
import authRouter from './src/routers/auth/index.js';
import quizRouter from './src/routers/quiz/quizRouter.js';
import questionRouter from './src/routers/question/questionRouter.js';

import ejs from 'ejs';
import path from 'path';
const __dirname = path.resolve();

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', __dirname + '/public');
app.engine('html', ejs.renderFile);
app.use(express.static('public'));
// console.log(process.env.MONGODB_URI);
mongoose
  // .connect(String(process.env.MONGODB_URI))   //for deploy
  // for local development
  .connect(
    'mongodb+srv://quizhub:cse416quizhubpassword@quizhub-database.h1p15.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-cvb3kh-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
  )
  .then((res) => console.log('Connected'))
  .catch((err) => console.error(err));

app.use(
  cors({
    origin: [
      'https://cse416-quizhub.netlify.app',
      'https://cse416-quizhub.heroku.app',
      'http://localhost:3000',
      'http://localhost:4000',
      // 'http://localhost:5000',
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// router middleware
app.use('/api/consumer', consumerRouter);
app.use('/api/creator', creatorRouter);
app.use('/api/creatorHome', platformRouter);
app.use('/api/auth', authRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/question', questionRouter);

app.get('/', (req, res) => {
  res.render('index.html');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
