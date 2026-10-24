/**
 * Role-Based Access Control Guard
 * @param  {...string} allowedRoles (e.g. 'admin', 'author')
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Role '${req.user?.role || 'Guest'}' lacks permission for this action.`
      });
    }
    next();
  };
};

module.exports = authorizeRoles;