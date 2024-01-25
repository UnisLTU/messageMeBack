const routeNotFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // Extract the status code from the error, defaulting to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  // Set the HTTP status code of the response
  res.status(statusCode);

  // Send a JSON response with error details
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { routeNotFound, errorHandler };
