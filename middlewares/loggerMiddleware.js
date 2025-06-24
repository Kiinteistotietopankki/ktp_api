const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  const userId = req.user?.id || 'anonymous'; // Assumes authentication middleware sets req.user
  logger.info({
    message: `${req.method} ${req.originalUrl}`,
    userId,
    route: req.originalUrl,
    timestamp: new Date().toISOString()
  });
  next();
};

module.exports = requestLogger;
