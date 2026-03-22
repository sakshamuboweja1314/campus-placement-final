// Job model
// Fields: title, company, description, location, salary, recruiter (ref to User), createdAt

const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, default: '' },
    salary: { type: Number },
    recruiter: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
