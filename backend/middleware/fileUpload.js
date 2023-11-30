import multer from "multer";
import path from "path";

let tempFilename = ""
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        try {
            console.log("from HandleUpdate")
            callback(null, 'upload/')
        } catch (error) {
            console.log(error)
        }
    },
    filename: (req, file, callback) => {
        try {
            console.log("from HandleUpdate")
            tempFilename = Date.now() + path.extname(file.originalname)
            req.tempFilename = tempFilename
            return callback(null, tempFilename)
        } catch (error) {
            console.log(error)
        }
    }
})

const fileFilter = (req, file, callback) => {
    try {
        console.log("from HandleUpdate")
        const tempFilename = req.tempFilename;
        console.log(`File ${tempFilename} is about to be uploaded.`);
        callback(null, true)
        
    } catch (error) {
        console.log(error)
    }
};


const upload = multer({ storage, fileFilter })



export default upload