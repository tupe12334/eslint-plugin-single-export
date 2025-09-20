// Valid: Single CommonJS export - module.exports
function createLogger(name) {
  return {
    info: (msg) => console.log(`[${name}] INFO: ${msg}`),
    error: (msg) => console.error(`[${name}] ERROR: ${msg}`)
  }
}

module.exports = createLogger