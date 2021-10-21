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
    const createLeaderboard = await Leaderboard.insertMany(data.items);
    res.send({ createLeaderboard });
  })
);

//create new data
leaderboardRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const leaderboard = new Leaderboard({
      name: 'sample name ' + Date.now(),
      image: '/images/p1.jpg',
      price: 0,
      category: 'sample category',
      status: 'OnSale',
      description: 'sample description',
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
      leaderboard.name = req.body.name;
      leaderboard.price = req.body.price;
      leaderboard.image = req.body.image;
      leaderboard.category = req.body.category;
      leaderboard.status = req.body.status;
      leaderboard.description = req.body.description;
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
