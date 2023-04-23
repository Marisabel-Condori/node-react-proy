import { Router } from "express";
import { loginauth, createauth, forgotauth } from "../controller/authController.js";

const router = Router()

router.get('/login', loginauth)
router.post('/auth', createauth)
router.patch('/forgot', forgotauth)
// router.delete('/persona/:idpersona', deletePersona)
 
export default router  
