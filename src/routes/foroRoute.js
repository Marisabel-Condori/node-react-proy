import { Router } from "express";
import { getforo, getforoById } from "../controller/foroController.js";

const router = Router()

router.get('/foro' ,getforo)  
router.get('/foroById', getforoById)
// router.get('/forosbyidSeccion/:id', getforoById)
//router.post('/foro', createforo)
// router.patch('/curso/:id', updatePersona)
// router.delete('/curso/:id', deletePersona)

export default router
