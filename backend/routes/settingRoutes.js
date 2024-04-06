import { getHeader, saveHeader, getImprint, saveImprint, getDataPolicy, saveDataPolicy, getNewsLetter, saveNewsLetter} from "../controller/settingController.js"
import { Router } from "express"

const router=Router()

router.get('/imprint',getImprint)
router.post('/imprint',saveImprint)
router.get('/dataprivacy',getDataPolicy)
router.post('/dataprivacy',saveDataPolicy)
router.get('/getNewsLetters',getNewsLetter)
router.post('/addNewsLetters',saveNewsLetter)
router.get('/:header',getHeader)
router.post('/:header',saveHeader)

export default router