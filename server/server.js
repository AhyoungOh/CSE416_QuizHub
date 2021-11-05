import express from 'express';
import mongoose from 'mongoose';
import creatorRouter from './src/routers/creatorRouter.js';
import platformRouter from './src/routers/platform/platformRouter.js';
import consumerRouter from './src/routers/consumerRouter.js';
import cors from 'cors';
import authRouter from './src/routers/auth/index.js';
import platformRouter from './src/routers/platform/platformRouter.js';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then((res) => console.log('Connected'))
  .catch((err) => console.error(err));

  app.use(
    cors({
      origin: ['https://cse416-quizhub.netlify.app'],
      credentials: true,
    })
    // cors()
    // corsMiddleware
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

app.use('/api/consumer', consumerRouter);
app.use('/api/creator', creatorRouter);
app.use('/api/creatorHome', platformRouter);
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
