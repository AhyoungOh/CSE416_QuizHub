const mongoose = require('mongoose');
const { getDBUri } = require('../config'); // 중요한 정보같은거는 분리해놓을것.

let db;
const connect = async () => {
  const DB_URI = getDBUri();

  if (db) {
    return;
  }
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    // useFindAndModify: false,
  });

  db = mongoose.connection;
};

const disconnect = () => {
  if (!db) {
    return;
  }
  mongoose.disconnect();
};
module.exports = { connect, disconnect };
