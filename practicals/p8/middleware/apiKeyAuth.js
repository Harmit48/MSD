const VALID_API_KEY = process.env.API_SECRET_KEY || "MSD_SECURE_TOKEN_2026";

const apiKeyAuth = (req, res, next) => {
  const providedKey = req.headers['x-api-key'];

  if (!providedKey) {
    return res.status(401).json({
      success: false,
      error: "Unauthorized",
      message: "Missing 'x-api-key' in request headers."
    });
  }

  if (providedKey !== VALID_API_KEY) {
    return res.status(403).json({
      success: false,
      error: "Forbidden",
      message: "Invalid API Key provided. Access denied."
    });
  }

  // Key is valid, attach client identity and proceed
  req.authenticatedClient = "Authorized Enterprise Partner";
  next();
};

module.exports = apiKeyAuth;