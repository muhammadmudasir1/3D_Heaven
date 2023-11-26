import multer from "multer";
import path from "path";

let tempFilename=""
const storage =multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,'upload/')
    },
    filename: (req,file,callback)=>{
        tempFilename=Date.now()+path.extname(file.originalname)
        req.tempFilename=tempFilename
        return callback(null,tempFilename)
    }
})
 
const fileFilter = (req, file, callback) => {
    const tempFilename = req.tempFilename;
    console.log(`File ${tempFilename} is about to be uploaded.`);
    callback(null,true)
};


const upload = multer({storage,fileFilter})



export default upload