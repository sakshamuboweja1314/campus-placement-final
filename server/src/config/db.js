// MongoDB connection helper using mongoose
// Reads MONGO_URI from environment variables (process.env.MONGO_URI)

const mongoose = require('mongoose');

/**
 * Connects to MongoDB using mongoose.
 * - Expects `process.env.MONGO_URI` to be defined.
 * - Uses new URL parser and unified topology by default (mongoose handles defaults).
 */
async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment');
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    throw err;
  }
}

module.exports = connectDB;
