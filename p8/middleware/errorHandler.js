/**
 * Global Error Handling Middleware (4 arguments)
 */
const errorHandler = (err, req, res, next) => {
  console.error("🔥 Global Error Caught:", err.message);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    errorName: err.name || "InternalServerError",
    message: err.message || "An unexpected error occurred on the server.",
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;