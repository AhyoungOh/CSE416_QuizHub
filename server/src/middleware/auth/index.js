import Consumer from '../../models/consumerSchema.js';
import Creator from '../../models/creatorSchema.js';
const validUser = async (req, res, next) => {
  // console.log('req session: ', req.session);
  // console.log('req session: ', req.session.username);
  // console.log('req session: ', req.session.creatorUsername);
  // console.log('req session: ', req.session.consumerUsername);
  if (!req.session.creatorUsername && !req.session.consumerUsername)
    return res.status(403).send({
      message: 'not logged in',
    });
  if (req.session.consumerUsername) {
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
  } else if (req.session.creatorUsername) {
    try {
      const creator = await Creator.findOne({
        username: req.session.creatorUsername,
      });
      if (!creator) {
        return res.status(403).send({
          message: 'not logged in',
        });
      }
      req.creator = creator;
    } catch (error) {
      return res.status(403).send({
        message: 'not logged in',
      });
    }
  }

  next();
};

export default validUser;
