// import dictionary from '../models/dictionary';
const express = require('express');

const router = express.Router();
// const authRouter = require('./auth');
const consumerRouter = require('./consumerAuth');
const creatorRouter = require('./creatorAuth');

router.use('/consumerAuth', consumerRouter);
router.use('/creatorAuth', creatorRouter);
// router.use('/dictionary', authDictionary);
// console.log(router);
module.exports = router;
