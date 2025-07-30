function toLower(str) {
  return typeof str === 'string' ? str.toLowerCase() : '';
}

function handleServiceError(res, error) {
  if (error.response) {
    res.status(error.response.status).json(error.response.data);
  } else {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { toLower, handleServiceError };