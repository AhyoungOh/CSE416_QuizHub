const express = require('express');
const mongoose = require('mongoose');

const Dictionary = require('../../models/dictionary');

const { validUser } = require('../../middleware/user');
const { findOne } = require('../../models/dictionary');
const router = express.Router();

// Write
// Modify
// Delete
// Get
router.get('/', (req, res) => {
  Dictionary.find()
    .sort({ _id: -1 })
    .limit(6)
    .exec((err, dictionary) => {
      if (err) throw err;
      res.json(dictionary);
    });
});

router.put('/user', validUser, async (req, res) => {
  const { slangId } = req.body;
  const userId = req.user._id;
  try {
    const slang = await Dictionary.findOne({ _id: slangId });
    const correctUserIds = slang.correctUserIds;
    await Dictionary.updateOne(
      { _id: slangId },
      { correctUserIds: [...correctUserIds, userId] }
    );
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = router;
