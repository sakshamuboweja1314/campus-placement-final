// Centralized error handling middleware for Express
// Sends JSON error responses and logs server errors

module.exports = function (err, req, res, next) {
  console.error(err);
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
};
