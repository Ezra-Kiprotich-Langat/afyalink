import express from "express"
import homeRoutes from "./routes/home.js"
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/',homeRoutes)
export default app

