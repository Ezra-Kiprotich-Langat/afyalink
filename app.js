import express from "express"
import homeRoutes from "./routes/home.js"
const app = express()

app.use('/',homeRoutes)
export default app

