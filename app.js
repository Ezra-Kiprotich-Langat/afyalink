import express from "express"
import homeRoutes from "./routes/home.js"
import userRoutes from "./routes/userRoutes.js"
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/',homeRoutes)
app.use("/users",userRoutes)
export default app

