// Application model
// Fields: job (ref Job), applicant (ref User), resumeUrl, status, appliedAt

const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    applicant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    resumeUrl: { type: String },
    status: { type: String, enum: ['applied', 'shortlisted', 'rejected', 'hired'], default: 'applied' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
