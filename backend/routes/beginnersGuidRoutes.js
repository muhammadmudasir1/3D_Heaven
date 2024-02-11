import {CreateBeginnersGuid,UpdateBeginnersGuid,deleteBeginnersGuid,getAllBeginnersGuid,beginnersGuidById, removeImageFromBG} from "../controller/beginnersGuidController.js"
import { Router } from "express";
import upload from "../middleware/fileUpload.js";
import { EditorAccess } from "../middleware/userAccess.js";
import verifyToken from "../middleware/verifyToken.js";

const router=Router()

router.get('/',getAllBeginnersGuid)
router.get('/:id',beginnersGuidById)
router.post('/',upload.single("image"),verifyToken,EditorAccess,CreateBeginnersGuid)
router.patch('/:id',upload.single("image"),verifyToken,EditorAccess,UpdateBeginnersGuid)
router.delete('/:id',verifyToken,EditorAccess,deleteBeginnersGuid)
router.delete('/image/:id',verifyToken,EditorAccess,removeImageFromBG)

export default router