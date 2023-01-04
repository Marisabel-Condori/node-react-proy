import { Router } from "express";
import { getPersona, getPersonaByEmail,createPersona, updatePersona, deletePersona } from "../controller/personaController.js";

const router = Router()

router.get('/persona', getPersona)
router.get('/persona/:correo', getPersonaByEmail)
router.post('/persona', createPersona)
router.patch('/persona/:idpersona', updatePersona)
router.delete('/persona/:idpersona', deletePersona)

export default router
