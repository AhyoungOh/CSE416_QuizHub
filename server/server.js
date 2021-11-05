import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './src/routers/auth/index.js';
import consumerRouter from './src/routers/consumerRouter.js';
import platformRouter from './src/routers/platform/platformRouter.js';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    'mongodb+srv://quizhub:cse416quizhubpassword@quizhub-database.h1p15.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  .then((res) => console.log('Connected'))
  .catch((err) => console.error(err));

// parse the data received from cookie to make it usable through req.session
app.use(
  cors()
);
app.use(cookieParser());

// front-end: save user info in cookie
// back-end: to use user info in session, set req.session.userID = userId

app.use(
  cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);


app.use('/api/consumer', consumerRouter);
app.use('/api/auth', authRouter);
app.use('/api/creatorHome', platformRouter);

app.get('/', (req, res) => {
  res.send('server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
