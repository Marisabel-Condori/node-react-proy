import { Router } from "express";
import { createseccion, getseccion, getseccionByIdCurso } from "../controller/seccionController.js";

const router = Router()

router.get('/seccion' ,getseccion)  
router.get('/seccionbyidCurso', getseccionByIdCurso)
// router.get('/seccionbyidCurso/:id', getseccionById)
router.post('/seccion', createseccion)
// router.patch('/curso/:id', updatePersona)
// router.delete('/curso/:id', deletePersona)

export default router
