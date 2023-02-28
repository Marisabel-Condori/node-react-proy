import { Router } from "express";
import { createComentario, getComentario, getComentariosByIdVideo, getComentariosByIdInstructor} from "../controller/comentarioController.js";

const router = Router()

router.get('/comentario' ,getComentario)  
router.get('/comentariosByIdVideo', getComentariosByIdVideo)
router.get('/comentariosByIdInstructor', getComentariosByIdInstructor)
router.post('/comentario', createComentario)
// router.patch('/curso/:id', updatePersona)
// router.delete('/curso/:id', deletePersona)

export default router
