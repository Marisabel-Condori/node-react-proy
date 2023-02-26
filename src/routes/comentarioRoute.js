import { Router } from "express";
import { createComentario, getComentario } from "../controller/comentarioController.js";

const router = Router()

router.get('/comentario' ,getComentario)  
router.post('/comentario', createComentario)
// router.patch('/curso/:id', updatePersona)
// router.delete('/curso/:id', deletePersona)

export default router
