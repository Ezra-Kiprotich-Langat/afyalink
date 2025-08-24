import createUserController from "../controllers/userController.js"
import express from "express"
const router = express.Router()
router.post("/register", createUserController)
export default router