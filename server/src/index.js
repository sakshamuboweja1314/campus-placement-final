// Entry point for the Express server
// - Loads environment
// - Connects to MongoDB using `src/config/db.js`
// - Mounts API routes
// - Adds basic error handling middleware

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const usersRouter = require('./routes/users');
const jobsRouter = require('./routes/jobs');
const applicationsRouter = require('./routes/applications');

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/users', usersRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationsRouter);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Error handler (should be last)
app.use(errorHandler);

// Connect DB then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to DB error:', err.message);
    process.exit(1);
  });
