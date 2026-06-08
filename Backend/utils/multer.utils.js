const multer = require("multer");
const path = require("path");
const crypto = require("crypto");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../images/"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');  
        const fn = uniqueSuffix + path.extname(file.originalname);
        cb(null, fn);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;