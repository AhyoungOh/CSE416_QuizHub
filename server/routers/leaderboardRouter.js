import { time } from 'console';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Leaderboard from '../models/leaderboardSchema.js';

const leaderboardRouter = express.Router();

//get data
leaderboardRouter.get(
  '/get',
  expressAsyncHandler(async (req, res) => {
    const createLeaderboard = await Leaderboard.find();
    res.send({ createLeaderboard });
  })
);

//post sample data
leaderboardRouter.post(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Leaderboard.remove({});
    const createLeaderboard = await Leaderboard.insertMany(data.ranking);
    res.send({ createLeaderboard });
  })
);

//create new data
leaderboardRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const leaderboard = new Leaderboard({
      username: req.body.username,
      score: req.body.score,
      time: {
        minutes: req.body.timeMinutes || time.minutes,
        seconds: req.body.timeSeconds || time.seconds,
      },
      // username: 'sample username ',
      // score: 1000,
      // time: {
      //   minutes: 7,
      //   seconds: 10,
      // },
      // isPrivate: true,
      // timestemp: {
      //   createdAt: Date.now(),
      //   updatedAt: Date.now(),
      // },
    });
    const createdLeaderboard = await leaderboard.save();
    res.send({
      message: 'Leaderboard Created',
      leaderboard: createdLeaderboard,
    });
  })
);

// update
leaderboardRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const leaderboardId = req.params.id;
    const leaderboard = await Leaderboard.findById(leaderboardId);

    console.log(req.body);
    if (leaderboard) {
      leaderboard.username = req.body.username;
      leaderboard.score = req.body.score;
      leaderboard.time.minutes = req.body.time.minutes;
      leaderboard.time.seconds = req.body.time.seconds;
      leaderboard.isPrivate = req.body.isPrivate;
      leaderboard.timestemp.updatedAt = req.body.timestemp.updatedAt;
      const updatedLeaderboard = await leaderboard.save();
      res.send({
        message: 'Leaderboard Updated',
        leaderboard: updatedLeaderboard,
      });
    } else {
      res.status(404).send({ message: 'Leaderboard Not Found' });
    }
  })
);

leaderboardRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const leaderboard = await Leaderboard.findById(req.params.id);
    if (leaderboard) {
      const deleteLeaderboard = await leaderboard.remove();
      res.send({
        message: 'Leaderboard Deleted',
        leaderboard: deleteLeaderboard,
      });
    } else {
      res.status(404).send({ message: 'Leaderboard Not Found' });
    }
  })
);

export default leaderboardRouter;
