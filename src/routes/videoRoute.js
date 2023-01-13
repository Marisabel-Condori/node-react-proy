import { Router } from "express";
import { createvideo, getvideo, getvideoById } from "../controller/videoController.js";

const router = Router()

router.get('/video' ,getvideo)  
router.get('/videosbyidSeccion', getvideoById)
// router.get('/videosbyidSeccion/:id', getvideoById)
router.post('/video', createvideo)
// router.patch('/curso/:id', updatePersona)
// router.delete('/curso/:id', deletePersona)

export default router
