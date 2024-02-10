import {CreateNews,UpdateNews,deleteNews,getAllNews,NewsById, removeImage} from "../controller/newsController.js"
import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import upload from "../middleware/fileUpload.js";

const router=Router()

router.get('/',getAllNews)
router.get('/:id',NewsById)
router.post('/',verifyToken,upload.single("image"),CreateNews)
router.patch('/:id',verifyToken,upload.single("image"),UpdateNews)
router.delete('/:id',verifyToken,deleteNews)
router.delete('/image/:id',verifyToken,removeImage)

export default router