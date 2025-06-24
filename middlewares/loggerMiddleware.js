const logger = require('../utils/logger');


const requestLogger = (req, res, next) => {
  const userId = req.user?.id || 'anonymous';

  // Keep original res.json function
  const originalJson = res.json;

  res.json = function (data) {
    // Extract only the field names (keys) from the response data if it's an object
    let responseFields = [];
    if (data && typeof data === 'object') {
      if (Array.isArray(data)) {
        // If response is an array, get keys from first item if exists
        responseFields = data.length > 0 && typeof data[0] === 'object'
          ? Object.keys(data[0])
          : [];
      } else {
        responseFields = Object.keys(data);
      }
    }

    logger.info({
      message: `${req.method} ${req.originalUrl} response`,
      userId,
      route: req.originalUrl,
      timestamp: new Date().toISOString(),
      responseFields
    });

    // Call original res.json with the data
    return originalJson.call(this, data);
  };

  next();
};

module.exports = requestLogger;