const { Schema, model } = require('mongoose');
const argon2 = require('argon2');

const creatorSchema = new Schema({
  ownedplatformId: { type: Schema.Types.ObjectID, ref: 'Platform' }, //this is a function call platform schema
  creatorImage: { type: String },
  selfIntroduction: { type: String },
  creatorUsername: { type: String },
  creatorEmail: { type: String },
  password: { type: String },
});

module.exports = model('creator', creatorSchema);
