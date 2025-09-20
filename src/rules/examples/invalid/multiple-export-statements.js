// Invalid: Multiple export statements
const utils = {
  formatDate: (date) => date.toISOString(),
  parseJson: (str) => JSON.parse(str)
}

const constants = {
  MAX_SIZE: 1000,
  MIN_SIZE: 10
}

export { utils }
export { constants }