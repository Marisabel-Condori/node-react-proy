import { Router } from "express";
import { getCurso, getCursoById } from "../controller/cursoController.js";

const router = Router()

router.get('/curso' ,getCurso)  
router.get('/cursoById/:id', getCursoById)
// router.post('/curso', createPersona)
// router.patch('/curso/:id', updatePersona)
// router.delete('/curso/:id', deletePersona)

export default router
