const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const Creator = require('../../models/creatorSchema');

const { validUser } = require('../../middleware/creator');

// Signup
router.post('/', async (req, res) => {
  // if not getting all the required inputs, send error msg
  if (
    !req.body.email ||
    !req.body.username ||
    !req.body.password
  ){
    return res.status(400).send({
      message: 'infos are required',
    });
  }
  try {
    // console.log(req.body.username);
    const existingUser = await Creator.findOne({
      creatorUsername: req.body.username,
    });
    // console.log(existingUser);
    // when username already existed
    if (existingUser)
      return res.status(403).send({
        message: 'username already exists',
      });

    // After verifying all the inputs, add data into db
    const creator = new Creator({
      creatorUsername: req.body.username,
      password: req.body.password,
      creatorEmail: req.body.email,
    });
    await creator.save();

    // to log the user in after signing up
    // req.session.userID = user.id;

    // send user information (password will disappear as toJSON running when creating the creatorSchema, send only the username and location)
    return res.send({
      creator: creator,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Login
router.post('/login', async (req, res) => {
  // if not getting all the inputs, send error msg
  if (!req.body.username || !req.body.password) return res.sendStatus(400);

  try {
    // check if username exist in db
    const creator = await Creator.findOne({
      creatorUsername: req.body.username,
    });

    // if username doesn't exist, send error msg
    // for security reason, hide the fact that it's the username missing
    if (!creator)
      return res.status(403).send({
        message: 'username or password is wrong',
      });

    // if username existed but the password doesn't match
    if (!(await creator.comparePassword(req.body.password)))
      return res.status(403).send({
        message: 'password is wrong',
      });

    // after all the verifications, login (loading the session userID === login)
    req.session.creatorUsername = creator.creatorUsername;
    return res.send({
      creator: creator,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Get user information
// limited to only the logged in user can use it like what validUser middleware does
router.get('/', validUser, async (req, res) => {
  try {
    res.send({
      creator: req.creator,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Logout
// can be seen as unloading the session userId
router.delete('/', validUser, async (req, res) => {
  try {
    req.session = null;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;