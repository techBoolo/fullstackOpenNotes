class ErrorMessage extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
  }
}

export default ErrorMessage
