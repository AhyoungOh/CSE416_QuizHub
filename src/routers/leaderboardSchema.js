import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js.js';
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

//create new data
leaderboardRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const leaderboard = new Leaderboard({
      consumerId: req.body.consumerId,
      username: req.body.username,
      score: req.body.score,
      time: {
        minutes: req.body.time.minutes,
        seconds: req.body.time.seconds,
      },
      quizId: req.body.quizId,
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
      leaderboard.consumerId = req.body.consumerId;
      leaderboard.username = req.body.username;
      leaderboard.score = req.body.score;
      leaderboard.time.minutes = req.body.time.minutes;
      leaderboard.time.seconds = req.body.time.seconds;
      leaderboard.quizId = req.body.quizId;
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
