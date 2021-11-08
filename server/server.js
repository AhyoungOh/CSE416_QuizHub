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

// middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(process.env.MONGODB_URI);

mongoose
  .connect('mongodb+srv://quizhub:cse416quizhubpassword@quizhub-database.h1p15.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then((res) => console.log('Connected'))
  .catch((err) => console.error(err));

app.use(
  cors({
    origin: ['https://cse416-quizhub.netlify.app', 'http://localhost:3000'],
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

app.get('/', (req, res) => {
  res.send('server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
