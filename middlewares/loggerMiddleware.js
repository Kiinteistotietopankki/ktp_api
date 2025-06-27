const logger = require('../utils/logger');
const lokitusService = require('../services/lokitusService');

const requestLogger = (req, res, next) => {
  const userId = req.user?.id || 'anonymous';
  const originalJson = res.json;

  res.json = async function (data) {
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
    const finnishTime = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' });

    // Log to console/file
    logger.info({
      userId,
      message: `${req.method} ${req.originalUrl}`,
      timestampUTC: utcTimestamp,
      timestampFinnish: finnishTime,
      responseFields
    });

    // Create a Loki log entry in DB
    try {
      await lokitusService.createLoki({
        userId,
        message: `${req.method} ${req.originalUrl}`,
        timeStampUTC: utcTimestamp,
        timeStampFinnish: finnishTime,
        responseField: responseFields.join(','),
      });
    } catch (err) {
      logger.error('Failed to save log entry to DB', err);
      // Don't block response flow
    }


    return originalJson.call(this, data);
  };

  next();
};

module.exports = requestLogger;
