import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/leaderboardSchema.js';

const leaderboardRouter = express.Router();

//get data
leaderboardRouter.get(
  '/get',
  expressAsyncHandler(async (req, res) => {
    const createLeaderboard = await Product.find();
    res.send({ createLeaderboard });
  })
);

//post sample data
leaderboardRouter.post(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Product.remove({});
    const createLeaderboard = await Product.insertMany(data.products);
    res.send({ createLeaderboard });
  })
);

//create new data
leaderboardRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'sample name ' + Date.now(),
      image: '/images/p1.jpg',
      price: 0,
      category: 'sample category',
      status: 'OnSale',
      description: 'sample description',
    });
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
  })
);

leaderboardRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    console.log(req.body);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.status = req.body.status;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

leaderboardRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default leaderboardRouter;
