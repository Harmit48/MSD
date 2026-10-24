const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "msd_super_secret_jwt_key_2026";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied: No authentication token provided in headers."
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, username, role }
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired session token."
    });
  }
};

module.exports = verifyToken;