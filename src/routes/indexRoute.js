import { Router } from "express";
import {ping} from '../controller/indexController.js'

const router = Router()

router.get('/ping', ping)

export default router