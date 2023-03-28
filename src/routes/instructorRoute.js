import { Router } from "express";
import { createInstructor, getinstructor, getinstructorById, updateInstructor, deleteInstructor } from "../controller/instructorController.js";

const router = Router()

router.get('/instructor' ,getinstructor)  
router.get('/getinstructorById/:id', getinstructorById)
router.post('/instructor', createInstructor)
router.patch('/instructor', updateInstructor)
router.delete('/instructor', deleteInstructor)  

export default router
