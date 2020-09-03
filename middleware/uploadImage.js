const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const fileName = `${uuid.v4()}-${file.originalname}`;
        cb(null, fileName);
    }
});

// multer
const upload = multer({storage});

module.exports = upload;