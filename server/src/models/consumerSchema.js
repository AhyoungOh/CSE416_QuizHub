// import { Schema, model } from 'mongoose';
import pkg from 'mongoose';

// const mongoose = require('mongoose');
// const { Schema, model } = require('mongoose');
// const argon2 = require('argon2');
import argon2 from 'argon2';
const { Schema, model } = pkg;

const consumerSchema = new Schema({
  consumerDescription: { type: String },
  consumerImage: { type: Number, default: 0 },
  consumerUsername: { type: String },
  consumerEmail: { type: String },
  password: { type: String },
  consumerIsPrivate: { type: Boolean, default: false },
  consumerQuizHistoryList: [
    {
      Quizzes: {
        quizId: { type: Schema.Types.ObjectID, ref: 'Quiz' },
        correctNumber: { type: Number },
        quizTimeTaken: {
          minutes: { type: Number },
          seconds: { type: Number },
        },
        accomplishedDate: { type: Date },
        usedTrialNumber: { type: Number },
      },
    },
  ],
  certificates: [
    {
      certificateId: {
        type: Schema.Types.ObjectID,
        ref: 'Certificate',
      },
      accomplishedDate: { type: Date },
    },
  ],
  badges: [
    {
      badgeId: { type: Schema.Types.ObjectID, ref: 'Badge' },
      accomplishedDate: { type: Date },
      badgeVisibility: { type: Boolean },
    },
  ],
});

consumerSchema.pre('save', async function (next) {
  // 3가지 경우가 있음
  // 1. 처음 회원가입을 해서 해싱되지 않은 비밀번호가 들어오거나 (new)
  // 2. 비밀번호 변경을 해서 기존 password와 다를 때
  // 3. password말고 username이나 location이 변경되어 이 pre 로직이 실행될 때
  // 3번 경우 해싱을 할 필요 없으므로 바로 이 로직을 종료함.
  if (!this.isModified('password')) return next();

  try {
    // 패스워드를 해싱해서 저장.
    const hash = await argon2.hash(this.password);
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// const Consumer = model('Consumer', consumerSchema);
consumerSchema.methods.comparePassword = async function (password) {
  try {
    const isMatch = await argon2.verify(this.password, password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

// module.exports = model('consumer', consumerSchema);
export default model('consumer', consumerSchema);
