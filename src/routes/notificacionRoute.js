import { Router } from "express";
import { getNotificacionByIdInstructor } from "../controller/notificacionController.js";

const router = Router()

router.get('/notificacionByIdInstructor', getNotificacionByIdInstructor)
// router.patch('/curso/:id', updatePersona)
// router.delete('/curso/:id', deletePersona)

export default router
