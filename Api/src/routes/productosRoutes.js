import { Router } from "express"
import { postProducto,deleteProducto,getProductos,getDetailProduct  } from "../controllers/productosControllers.js"
import {requireAuth,simpleAuth} from '../helpers/requireAuth.js'
const router = Router()

router.post("/company/postProduct", postProducto)
router.delete("/company/deleteProduct/:id",requireAuth, deleteProducto)
router.get("/getProductos", getProductos)
router.get("/getProducto/:id",simpleAuth, getDetailProduct )

export default router
