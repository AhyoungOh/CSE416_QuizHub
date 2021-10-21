import express from 'express';
import mongoose from 'mongoose';
import leaderboardRouter from './routers/leaderboardRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    'mongodb+srv://quizhub:cse416quizhubpassword@quizhub-database.h1p15.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  .then((res) => console.log('Connected'))
  .catch((err) => console.error(err));

app.use('/api/leaderboard', leaderboardRouter);

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
