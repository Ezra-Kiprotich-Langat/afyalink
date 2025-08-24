import {createUser, findUserByEmail} from "../models/userModel.js"
import bcrypt from "bcryptjs"
import sendEmail from "../utils/sendEmail.js"
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
        return res.status(201).json({message: "User successfully registered", userId: userId})
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
export default userCreateController;