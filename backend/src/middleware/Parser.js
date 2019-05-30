const bodyParser = require('body-parser');
const multer  = require('multer');

module.exports = {
    jsonParser: bodyParser.json({ limit: '10mb' }),
    urlencodedParser: bodyParser.urlencoded({ extended: false }),
    upload: multer({ dest: 'uploads/' }),
};