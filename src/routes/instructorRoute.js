import { Router } from "express";
import { createInstructor, getinstructor, getinstructorById } from "../controller/instructorController.js";

const router = Router()

router.get('/instructor' ,getinstructor)  
router.get('/getinstructorById/:id', getinstructorById)
router.post('/instructor', createInstructor)
// router.patch('/curso/:id', updatePersona)
// router.delete('/curso/:id', deletePersona)

export default router
