const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info', // You can change this to 'debug' for more verbosity
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(), // Log to console (viewable in Azure Web App logs)
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // File for errors
    new transports.File({ filename: 'logs/combined.log' }) // File for all logs
  ],
});

module.exports = logger;