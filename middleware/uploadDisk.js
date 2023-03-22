const multer = require('multer');
const path = require('path');

const publicDirectory = path.join(__dirname, "../public")
console.info(publicDirectory);
const uploadDirectory = path.join(publicDirectory, "upload/")
console.info(uploadDirectory);

const diskstorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDirectory)
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() + 1E9)
        cb(null, file.fieldname + "-" + Date.now()+ path.extname(file.originalname));
    }
})

module.exports = multer({ storage:diskstorage })