function ApplicationError (code, error) {
    this.name = "ApplicationError";
    this.message = error.message;
    Error.call(this, error.message);
    Error.captureStackTrace(this, this.constructor);
    this.code = code;
    this.status = 500;
    this.inner = error;
}

ApplicationError.prototype = Object.create(Error.prototype);
ApplicationError.prototype.constructor = ApplicationError;

module.exports = ApplicationError;
