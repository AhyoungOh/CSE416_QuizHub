import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  badgeRasterizedContentUrl: { type: String },
  badgeEncodedContent: { type: String },
  badgeUploadFile: { data: Buffer, type: String },
  badgeRequirementsAccuracy: { type: Number, min: 0, max: 100 },
});
const Badge = mongoose.model('Badge', badgeSchema);

export default Badge;
