import { createDoctorController,getAllDoctorsController,getDoctorByIdController,updateDoctorByIdController, deleteDoctorByIdController } from "../controllers/doctorController.js";
import express from "express"
const router = express.Router()
router.post("/create-doctor",createDoctorController)
router.get("/get-all-doctors",getAllDoctorsController)
router.get("/get-doctor-by-id/:id",getDoctorByIdController)
router.put("/update-doctor-by-id/:id",updateDoctorByIdController)
router.delete("/delete-doctor-by-id/:id", deleteDoctorByIdController)
export default router



