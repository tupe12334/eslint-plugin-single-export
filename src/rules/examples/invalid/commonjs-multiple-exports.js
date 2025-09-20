// Invalid: Multiple CommonJS exports
module.exports = {
  main: 'main function'
}

exports.helper = 'helper function'
exports.config = { debug: true }