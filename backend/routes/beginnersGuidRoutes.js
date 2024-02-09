import {CreateBeginnersGuid,UpdateBeginnersGuid,deleteBeginnersGuid,getAllBeginnersGuid,beginnersGuidById, removeImageFromBG} from "../controller/beginnersGuidController.js"
import { Router } from "express";
import upload from "../middleware/fileUpload.js";

const router=Router()

router.get('/',getAllBeginnersGuid)
router.get('/:id',beginnersGuidById)
router.post('/',upload.single("image"),CreateBeginnersGuid)
router.patch('/:id',upload.single("image"),UpdateBeginnersGuid)
router.delete('/:id',deleteBeginnersGuid)
router.delete('/image/:id',removeImageFromBG)

export default router