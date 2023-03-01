import { Router } from "express"
import { postProducto,deleteProducto,getProductos,getDetailProduct, getProductosRandom, getProductosFamous  } from "../controllers/productosControllers.js"
import {requireAuth,simpleAuth} from '../helpers/requireAuth.js'
const router = Router()

router.post("/company/postProduct", postProducto)
// router.post("/product/buy/:id",requireAuth, pagarProducto)
router.delete("/company/deleteProduct/:id",requireAuth, deleteProducto)
router.get("/getProductos", getProductos)
router.get("/getProducto/:id",simpleAuth, getDetailProduct )
router.get("/getProductosrandom", getProductosRandom )
router.get("/getProductosFamous", getProductosFamous )

export default router
