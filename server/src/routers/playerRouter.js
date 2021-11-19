import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js.js';
import Player from '../models/playerSchema.js';

const playerRouter = express.Router();

//get data
playerRouter.get(
  '/get',
  expressAsyncHandler(async (req, res) => {
    const createPlayer = await Player.find();
    res.send({ createPlayer });
  })
);

//post sample data
playerRouter.post(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Player.remove({});
    const createPlayer = await Player.insertMany(data.ranking);
    res.send({ createPlayer });
  })
);

//create new data
playerRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const player = new Player({
      userId: req.body.userId,
      username: req.body.username,
      score: req.body.score,
      time: {
        minutes: req.body.time.minutes,
        seconds: req.body.time.seconds,
      },
      quizId: req.body.quizId
    });
    const createdPlayer = await player.save();
    res.send({
      message: 'Player Created',
      player: createdPlayer,
    });
  })
);

// update
playerRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const playerId = req.params.id;
    const player = await Player.findById(playerId);

    console.log(req.body);
    if (player) {
      player.userId = req.body.userId;
      player.username = req.body.username;
      player.score = req.body.score;
      player.time.minutes = req.body.time.minutes;
      player.time.seconds = req.body.time.seconds;
      player.quizId = req.body.quizId;
      const updatedPlayer = await player.save();
      res.send({
        message: 'Player Updated',
        player: updatedPlayer,
      });
    } else {
      res.status(404).send({ message: 'Player Not Found' });
    }
  })
);

playerRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const player = await Player.findById(req.params.id);
    if (player) {
      const deletePlayer = await player.remove();
      res.send({
        message: 'Player Deleted',
        player: deletePlayer,
      });
    } else {
      res.status(404).send({ message: 'Player Not Found' });
    }
  })
);

export default playerRouter;
