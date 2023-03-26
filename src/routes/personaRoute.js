import { Router } from "express";
import { getPersona, getPersonaByEmail,createPersona, updatePersona, deletePersona, getesEstudianteDocente } from "../controller/personaController.js";

const router = Router()

router.get('/persona' ,getPersona)  
router.get('/personaByEmail/:correo', getPersonaByEmail)
router.get('/esEstudianteDocente', getesEstudianteDocente)
router.post('/persona', createPersona)
router.patch('/persona/:idpersona', updatePersona)
router.delete('/persona/:idpersona', deletePersona)

export default router
