import { Router } from "express"
import { postCompany, getCompany} from "../controllers/companyControllers.js"

const router = Router()

router.post("/company/register", postCompany)
router.get("/company/:id", getCompany)


export default router
