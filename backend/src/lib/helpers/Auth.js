const crypto = require('crypto');

const hashPassword = plainTextPassword => {
    return crypto.createHash('sha256').update(plainTextPassword).digest('hex');
};

module.exports = {
    hashPassword,
};
