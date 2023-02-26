import { Router } from "express";
import { createCurso, getCurso, getCursoByCategoria, getCursoByEstudiante, getCursoByInstructor } from "../controller/cursoController.js";

const router = Router()

router.get('/curso' ,getCurso)  
router.get('/cursoByCategoria', getCursoByCategoria)
router.get('/cursoByEstudiante', getCursoByEstudiante)
router.get('/cursoByInstructor', getCursoByInstructor)
router.post('/curso', createCurso)
// router.patch('/curso/:id', updatePersona)
// router.delete('/curso/:id', deletePersona)

export default router
