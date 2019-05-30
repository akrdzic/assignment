function ForbiddenError (code, error) {
    this.name = "ForbiddenError";
    this.message = error.message;
    Error.call(this, error.message);
    Error.captureStackTrace(this, this.constructor);
    this.code = code;
    this.status = 403;
    this.inner = error;
}

ForbiddenError.prototype = Object.create(Error.prototype);
ForbiddenError.prototype.constructor = ForbiddenError;

module.exports = ForbiddenError;
