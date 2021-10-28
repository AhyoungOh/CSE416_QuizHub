import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  certificateRasterizedContentUrl: { type: String },
  certificateEncodedContent: { type: String },
  certificateUploadFile: { data: Buffer, type: String },
  certificateRequirementsAccuracy: { type: Number, min: 0, max: 100 },
});
const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
