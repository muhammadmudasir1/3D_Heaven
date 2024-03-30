import multer from "multer";
import path from "path";

async function convertToWebP(inputImagePath, outputImagePath) {
    try {
        await sharp(inputImagePath).toFormat('webp').toFile(outputImagePath);
        console.log(`Image converted to WebP: ${outputImagePath}`);
    } catch (error) {
        console.error('Error converting image to WebP:', error);
    }
}

let tempFilename = ""
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        try {
            callback(null, 'upload/')
        } catch (error) {
            console.log(error)
        }
    },
    filename: (req, file, callback) => {
        try {
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
        const tempFilename = req.tempFilename;
        callback(null, true)
        
    } catch (error) {
        console.log(error)
    }
};
const limits = {
    fieldSize: 1024 * 1024 * 100,
  };
  

const upload = multer({ storage, limits,fileFilter })



export default upload