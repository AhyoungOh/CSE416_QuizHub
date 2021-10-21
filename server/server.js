import express from 'express';
import mongoose from 'mongoose';
import badgeRouter from './routers/badgeRouter.js';
import certificateRouter from './routers/certificateRouter.js';
import consumerRouter from './routers/consumerRouter.js';
import creatorRouter from './routers/creatorRouter.js';
import leaderboardRouter from './routers/leaderboardRouter.js';
import platformRouter from './routers/platformRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    'mongodb+srv://quizhub:cse416quizhubpassword@quizhub-database.h1p15.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  )
  .then((res) => console.log('Connected'))
  .catch((err) => console.error(err));

app.use('/api/badge', badgeRouter);
// app.use('/api/certificate', certificateRouter);
// app.use('/api/consumer', consumerRouter);
// app.use('/api/creator', creatorRouter);
app.use('/api/leaderboard', leaderboardRouter);
// app.use('/api/platform', platformRouter);

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
