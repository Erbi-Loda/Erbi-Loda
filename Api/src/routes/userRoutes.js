import { Router } from "express"
import { postUser, getUser, loginUser,getHistorialUser,getHistorialInfinitoUser,putFavoritoUser,getFavoritoUser } from "../controllers/userControllers.js"
import {requireAuth, simpleAuth} from '../helpers/requireAuth.js'
const router = Router()

router.post("/user/register", postUser)
router.post("/user/login", loginUser)
router.get("/user",simpleAuth, getUser)
router.get("/gethistorialuser",simpleAuth, getHistorialUser)
router.get("/gethistorialinfinitouser",simpleAuth, getHistorialInfinitoUser)
router.put("/putFavoritoUser",simpleAuth, putFavoritoUser)
router.get("/getFavoritoUser",simpleAuth, getFavoritoUser)

export default router
