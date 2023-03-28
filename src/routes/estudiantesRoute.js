import { Router } from "express";
import { getEstudiantes } from "../controller/estudiantesController.js";

const router = Router()

router.get('/estudiantes' ,getEstudiantes)  

export default router  
