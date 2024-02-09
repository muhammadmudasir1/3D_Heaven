import {CreateNews,UpdateNews,deleteNews,getAllNews,NewsById, removeImage} from "../controller/newsController.js"
import { Router } from "express";
import upload from "../middleware/fileUpload.js";

const router=Router()

router.get('/',getAllNews)
router.get('/:id',NewsById)
router.post('/',upload.single("image"),CreateNews)
router.patch('/:id',upload.single("image"),UpdateNews)
router.delete('/:id',deleteNews)
router.delete('/image/:id',removeImage)

export default router