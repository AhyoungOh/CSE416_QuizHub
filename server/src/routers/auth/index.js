import express from 'express';
const router = express.Router();
import Consumer from '../../models/consumerSchema.js';
import Creator from '../../models/creatorSchema.js';
// const { validUser } = require('../consumerRouter');
import validUser from '../../middleware/auth/index.js';

router.post('/consumer', async (req, res) => {
  // if not getting all the required inputs, send error msg
  if (!req.body.email || !req.body.username || !req.body.password)
    return res.status(400).send({
      message: 'infos are required',
    });

  try {
    // console.log(req.body.username);
    const existingConsumer = await Consumer.findOne({
      consumerUsername: req.body.username,
    });
    const existingCreator = await Creator.findOne({
      creatorUsername: req.body.username,
    });

    // console.log(existingUser);
    // 만약 username이 이미 있다면 username이미 있다는 메세지를 보낸다.
    if (existingConsumer || existingCreator)
      return res.status(403).send({
        message: 'username already exists',
      });

    // 정보 검증이 끝났으므로 user DB에 입력받은 정보를 저장한다.
    const consumer = new Consumer({
      consumerUsername: req.body.username,
      password: req.body.password,
      // id: req.body.id,
      consumerEmail: req.body.email,
      // creatorGroup: req.body.creatorGroup,
      // userGroup: req.body.userGroup,
    });
    await consumer.save();

    return res.send({
      consumer: consumer,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post('/creator', async (req, res) => {
  if (
    // !req.body.id ||
    !req.body.email ||
    !req.body.username ||
    !req.body.password
  )
    return res.status(400).send({
      message: 'infos are required',
    });

  try {
    // console.log(req.body.username);
    const existingCreator = await Creator.findOne({
      creatorUsername: req.body.username,
    });

    const existingConsumer = await Consumer.findOne({
      consumerUsername: req.body.username,
    });
    // console.log(existingUser);
    if (existingCreator || existingConsumer)
      return res.status(403).send({
        message: 'username already exists',
      });

    // 정보 검증이 끝났으므로 user DB에 입력받은 정보를 저장한다.
    const creator = new Creator({
      creatorUsername: req.body.username,
      password: req.body.password,
      creatorEmail: req.body.email,
      ownedPlatformId: [],
    });
    await creator.save();

    return res.send({
      creator: creator,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// 로그인 로직
router.post('/login', async (req, res) => {
  // 입력 검증 후 입력 안된게 있으면 에러를 보낸다.
  if (!req.body.username || !req.body.password) return res.sendStatus(400);

  try {
    // username 이 DB에 있는지 찾는다.
    const consumer = await Consumer.findOne({
      consumerUsername: req.body.username,
    });

    const creator = await Creator.findOne({
      creatorUsername: req.body.username,
    });

    if (!consumer && !creator)
      return res.status(403).send({
        message: 'username or password is wrong',
      });

    if (consumer) {
      if (!(await consumer.comparePassword(req.body.password)))
        return res.status(403).send({
          message: 'password is wrong',
        });
      req.session.consumerUsername = consumer.consumerUsername;
      return res.send({
        consumer: consumer,
      });
    } else if (creator) {
      if (!(await creator.comparePassword(req.body.password)))
        return res.status(403).send({
          message: 'password is wrong',
        });

      req.session.creatorUsername = creator.creatorUsername;
      return res.send({
        creator: creator,
      });
    } else {
      throw new Error('non existing creator and consumer');
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get('/', validUser, async (req, res) => {
  try {
    if (req.consumer) {
      res.send({
        consumer: req.consumer,
      });
    } else if (req.creator) {
      res.send({
        creator: req.creator,
      });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/', validUser, async (req, res) => {
  try {
    req.session = null;
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

export default router;
