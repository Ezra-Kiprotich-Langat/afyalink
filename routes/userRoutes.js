import userCreateController, {loginController} from "../controllers/userController.js"
import express from "express"
const router = express.Router()
router.post("/register", userCreateController)
router.post("/login",loginController)
export default router