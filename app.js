import express from "express"
import homeRoutes from "./routes/home.js"
import userRoutes from "./routes/userRoutes.js"
import doctorRoutes from "./routes/doctor.js"
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/',homeRoutes)
app.use("/users",userRoutes)
app.use("/doctors",doctorRoutes)
export default app

