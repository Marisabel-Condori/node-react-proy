import { Router } from "express";
import { createInscribe, getInscribe, getInscritosByEstudiante, estaInscrito } from "../controller/seInscribeController.js";

const router = Router()

router.get('/inscribe' ,getInscribe)  
router.get('/inscritosByEstudiante' ,getInscritosByEstudiante)  
router.get('/estaInscrito' ,estaInscrito)  
router.post('/inscribe', createInscribe)
// router.patch('/curso/:id', updatePersona)
// router.delete('/curso/:id', deletePersona)

export default router
