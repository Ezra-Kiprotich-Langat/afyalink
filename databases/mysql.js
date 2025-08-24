import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

const pool = mysql.createPool(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.PASSWORD,
        database:process.env.DB_NAME,
        waitForConnections:true
    }
)
pool.getConnection().then(
    (connection)=>{
        console.log("Successfully connected to mysql database")
        connection.release()
    }
)
.catch(
    (err)=>{
        console.error("Error connecting to mysql database:",err.message)
        process.exit(1)
    })
export default pool