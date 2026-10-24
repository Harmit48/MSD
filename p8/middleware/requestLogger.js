const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  // Listen to response completion event
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusCode = res.statusCode;
    const colorCode = statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';

    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} - ${colorCode}${statusCode}\x1b[0m (${duration}ms) - IP: ${req.ip}`
    );
  });

  next();
};

module.exports = requestLogger;