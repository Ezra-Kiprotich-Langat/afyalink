import pool from "../databases/mysql.js"
export const createUser = async(name, email, phone_number, location, hashed_password)=>{
   const sql = `INSERT INTO users (name, email, phone_number, location, hashed_password) WHERE (?, ?, ?, ?, ?)`
    const [result] = await pool.execute(sql, [name, email, phone_number, location, hashed_password])
    return result.insertId
}

export const findUserByEmail = async(email)=>{
    const sql = `SELECT * FROM users WHERE  email = ? LIMIT 1`
    const [rows] = await pool.execute(sql, [email])
    return rows[0]
}