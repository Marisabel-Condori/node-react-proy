import { Router } from "express";
import { loginauth, createauth, logoutauth } from "../controller/authController.js";

const router = Router()

router.get('/login', loginauth)
router.post('/auth', createauth)
// router.get('/logout', logoutauth)
// router.delete('/persona/:idpersona', deletePersona)

export default router
