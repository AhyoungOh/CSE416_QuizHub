// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// const { getDBUri } = require('../config'); // 중요한 정보같은거는 분리해놓을것.
import { getDBUri } from '../config';

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

export default { connect, disconnect };
