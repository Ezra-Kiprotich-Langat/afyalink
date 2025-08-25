import {createUser, findUserByEmail} from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/sendEmail.js"
import dotenv from "dotenv"
dotenv.config()
const userCreateController = async(req,res)=>{
    const{name, email, phone_number, location, password} = req.body
    try{
        if(!name || !email || !phone_number|| ! location|| ! password){
            return res.status(400).json({message: "Name, email, phone_number, location and password are required."})
        }
        const user = await findUserByEmail(email)
        if(user){
            return res.status(400).json({message: "Email already registered"})
        }
        const hashed_password = await bcrypt.hash(password, 10)
        const userId = await createUser({name, email, phone_number, location, password:hashed_password})
        res.status(201).json({message: "User successfully registered", userId: userId})
        const recipient = email
        const subject = `Afyalink Registration`
        const body = `
        <h1>Hello ${name}. Welcome to Afyalink</h1>
        <p>Thank you registering with us</p><br><br>
        <p>Best regards,</p>
        <p>Afyalink</p>`
        await sendEmail(recipient, subject, body)
    } catch(error){
        return res.status(500).json({message: "Error occurred while creating the user"})
    }
}
export const loginController = async(req,res)=>{
    const{email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message: "Email and password are required"})
    }
    const existingUser = await findUserByEmail(email)
    if(!existingUser){
        res.status(401).json({message: "Invalid credentials"})
    }
    const isMatch = await bcrypt.compare(password, existingUser.hashed_password)
    if(!isMatch){
        return res.status(401).json({message: "Invalid credentials"})
    }
    const token = jwt.sign({id: existingUser.id, email: existingUser.email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    res.status(200).json({message: "Login Successfully", token})

}
export default userCreateController