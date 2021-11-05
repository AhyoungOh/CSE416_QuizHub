import Consumer from '../../models/consumerSchema.js';

const validUser = async (req, res, next) => {
  if (!req.session.username)
    return res.status(403).send({
      message: 'not logged in',
    });

  try {
    const consumer = await Consumer.findOne({
      username: req.session.consumerUsername,
    });
    if (!consumer) {
      return res.status(403).send({
        message: 'not logged in',
      });
    }
    req.consumer = consumer;
  } catch (error) {
    return res.status(403).send({
      message: 'not logged in',
    });
  }

  next();
};

export default validUser;
