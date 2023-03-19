import { Router } from "express"
import { postProducto,deleteProducto,getProductos,getDetailProduct, getProductosRandom, getProductosFamous, pagoProducto, buscarProductos  } from "../controllers/productosControllers.js"
import {requireAuth,simpleAuth} from '../helpers/requireAuth.js'
const router = Router()

router.post("/company/postProduct", postProducto)
router.delete("/company/deleteProduct/:id",requireAuth, deleteProducto)
router.get("/getProductos", getProductos)
router.get("/getProducto/:id",simpleAuth, getDetailProduct )
router.get("/getProductosrandom", getProductosRandom )
router.get("/getProductosFamous", getProductosFamous )
router.post("/pagoProducto",requireAuth, pagoProducto )
router.get("/buscarproductos", buscarProductos )

export default router
 