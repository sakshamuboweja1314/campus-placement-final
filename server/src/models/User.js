// User model
// Fields: name, email (unique), password, role (student|recruiter), createdAt

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // Note: For production, store a hashed password (bcrypt). This schema stores a string.
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'recruiter', 'admin'], default: 'student' },
    // Optional profile fields used by frontend forms
    institution: { type: String, default: '' },
    company: { type: String, default: '' }
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model('User', userSchema);
