import { Router } from "express"
import { postUser, getUser, loginUser } from "../controllers/userControllers.js"
import {requireAuth} from '../helpers/requireAuth.js'
const router = Router()

router.post("/user/register", postUser)
router.post("/user/login", loginUser)
router.get("/user/:id", getUser)

export default router
