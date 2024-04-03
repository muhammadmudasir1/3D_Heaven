import { getHeader, saveHeader, getImprint, saveImprint, getDataPolicy, saveDataPolicy} from "../controller/settingController.js"
import { Router } from "express"

const router=Router()

router.get('/imprint',getImprint)
router.post('/imprint',saveImprint)
router.get('/dataprivacy',getDataPolicy)
router.post('/dataprivacy',saveDataPolicy)
router.get('/:header',getHeader)
router.post('/:header',saveHeader)

export default router