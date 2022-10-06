import config from '../config/config.js'

const info = (...params) => {
  if(config.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const error = (...params) => {
  if(config.NODE_ENV !== 'test') {
    console.error(...params)
  }
}
const warn = (...params) => {
  if(config.NODE_ENV !== 'test') {
    console.warn(...params)
  }
}

const logger = {
  info,
  error,
  warn
}

export default logger
