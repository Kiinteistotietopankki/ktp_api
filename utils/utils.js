function toLower(str) {
  return typeof str === 'string' ? str.toLowerCase() : '';
}

module.exports = { toLower };