import mongoose from 'mongoose';

const creatorSchema = new mongoose.Schema({
  ownedplatformId: { type: mongoose.Schema.Types.ObjectID, ref: 'Platform' }, //this is a function call platform schema
  creatorImage: { type: String },
  selfIntroduction: { type: String },
  creatorUsername: { type: String },
  creatorEmail: { type: String },
  password: { type: String },
});
const Creator = mongoose.model('Creator', creatorSchema);

export default Creator;
