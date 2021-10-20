var mongoose = require('mongoose');

const Creator = new Schema({
  creatorId: ObjectId,
  ownedPlatfroms: [
    {
      platformName: { type: String, required: true },
      platformDescription: String,
      platformImage: { data: Buffer, contentType: String },
      ownedQuizzes: [ObjectId],
      createdDate: { type: Date, default: Date.now },
    },
  ],
  creatorImage: { type: Number, min: 0, max: 10 },
  selfIntroduction: String,
  creatorUsername: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  password: { type: String, required: true },
});

var Certificate = new Schema({
  certificateId: ObjectId,
  certificateRasterizedContentUrl: String,
  certificateEncodedContent: String,
  badgeUploadFile: { data: Buffer, contentType: String },
  certificateRequirementsAccuracy: { type: Number, min: 0, max: 100 },
});

var Badge = new Schema({
  badgeId: ObjectId,
  badgeRasterizedContentUrl: String,
  badgeEncodedContent: String,
  badgeUploadFile: { data: Buffer, contentType: String },
  badgeRequirementsAccuracy: { type: Number, min: 0, max: 100 },
});

const leaderboard = new Schema({
  leaderboardId: ObjectId,
  ranking: [
    {
      username: String,
      score: Number,
      time: {
        minutes: Number,
        seconds: Number,
      },
    },
  ],
  isPrivate: Boolean,
  timestamps: { createdAt: Date, updatedAt: Date },
});

module.exports = mongoose.model('Creator', Creator);
module.exports = mongoose.model('Certificate', Certificate);
module.exports = mongoose.model('Badge', Badge);
