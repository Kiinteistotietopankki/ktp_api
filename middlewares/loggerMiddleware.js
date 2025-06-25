const logger = require('../utils/logger');


const requestLogger = (req, res, next) => {
  const userId = req.user?.id || 'anonymous';
  console.log('USER ID IN LOGGER:', req.session?.userId)

  // Keep original res.json function
  const originalJson = res.json;

  res.json = function (data) {
    let responseFields = [];
    if (data && typeof data === 'object') {
      if (Array.isArray(data)) {
        responseFields = data.length > 0 && typeof data[0] === 'object'
          ? Object.keys(data[0])
          : [];
      } else {
        responseFields = Object.keys(data);
      }
    }

    const utcTimestamp = new Date().toISOString();

    // Convert to Finnish local time string
    const finnishTime = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' });

    logger.info({
      message: `${req.method} ${req.originalUrl} response`,
      userId,
      route: req.originalUrl,
      timestampUTC: utcTimestamp,
      timestampFinnish: finnishTime,
      responseFields
    });

    return originalJson.call(this, data);
  };

  next();
};


module.exports = requestLogger;