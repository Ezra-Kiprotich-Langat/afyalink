import { createDoctor,getAllDoctors,getDoctorById, updateDoctorById,deleteDoctorById} from "../models/doctorModels.js";
import bcrypt from "bcryptjs";
export const createDoctorController = async(req,res)=>{
    try{
    const {first_name, last_name, email, phone_number, specialization,availability, consultation_mode, password} = req.body
    if(!first_name || !last_name || !email || !phone_number || !specialization ||!availability || !consultation_mode || !password){
        return res.status(400).json({message: "First name, last name, email, phone number, specialization,availability, consultation mode, and password are required"})
    }
    const hashed_password = await bcrypt.hash(password, 10)
    const insertId = await createDoctor({first_name, last_name, email, phone_number, specialization,availability, consultation_mode, password:hashed_password})
    res.status(201).json({message: "Doctor successfully registered.",insert_Id:insertId})
    }catch(err){
        res.status(500).json({message: "An error occurred while registering a doctor."},err.message)
    }
}
export const getAllDoctorsController = async(req,res)=>{
  try {
    const {first_name, last_name, email, phone_number, specialization,availability, consultation_mode, password} = req.body
    const doctors = await getAllDoctors()
    res.status(201).json(doctors)
    }catch(err){
        res.status(500).json({ message: "Error fetching doctors.", error: err.message })
  }
}
export const getDoctorByIdController = async(req,res)=>{
    try{
        const {first_name, last_name, email, phone_number, specialization,availability, consultation_mode, password} = req.body
        const doctor = await getDoctorById(req.params.id)
        if(!doctor){
            return res.status(400).json({message: "Doctor not found"})
        }
        res.status(201).json(doctor)
    }catch(err){
        res.status(500).json({message: "Error fetching doctor.",error:err.message})
    }
}
export const updateDoctorByIdController = async(req,res)=>{
    try{
        const {id} = req.params
        const {first_name, last_name, email, phone_number, specialization,availability, consultation_mode, password} = req.body
        const doctor = await getDoctorById(id)
        if(!doctor){
             return res.status(400).json({message: "Doctor not found"})
        }
        const hashed_password = await bcrypt.hash(password, 10)
        const affectedRows = await updateDoctorById(id, {first_name, last_name, email, phone_number, specialization,availability, consultation_mode,password:hashed_password})
        res.status(200).json({message: "Doctor updated successfully"})
    }catch(err){
        res.status(500).json({message: "Error updating doctor.", error:err.message})
    }
}
export const deleteDoctorByIdController = async(req,res)=>{
    try{
        const affectedRows = await deleteDoctorById(req.params.id)
        if(affectedRows === 0){
            return res.status(400).json({message: "Doctor not found"})
        }
        res.status(201).json({message: "Doctor deleted successfully"})
    }catch(err){
        res.status(500).json({message: "Error deleting doctor.", error:err.message})
    }
}