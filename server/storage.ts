import multer from "multer"
import * as path from "path";
const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, 'public/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    },
});

const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 },
    storage: storage });
export default upload