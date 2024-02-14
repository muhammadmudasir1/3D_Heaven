import {CreateNews,UpdateNews,deleteNews,getAllNews,NewsById, removeImage} from "../controller/newsController.js"
import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import upload from "../middleware/fileUpload.js";
import {EditorAccess} from '../middleware/userAccess.js'

const router=Router()

router.get('/',getAllNews)
router.get('/:id',NewsById)
router.post('/',verifyToken,EditorAccess,upload.single("image"),CreateNews)
router.patch('/:id',verifyToken,EditorAccess,upload.single("image"),UpdateNews)
router.delete('/:id',verifyToken,EditorAccess,deleteNews)
router.delete('/image/:id',verifyToken,EditorAccess,removeImage)

export default router