import pool from "../databases/mysql.js"
export const createDoctor = async(doctor)=>{
    const {first_name, last_name, email, phone_number, specialization, availability, consultation_mode,password} = doctor
    const sql = `INSERT INTO doctors (first_name, last_name, email, phone_number, specialization, availability, consultation_mode, hash_password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    const [result] = await pool.execute(sql, [first_name, last_name, email, phone_number, specialization,availability, consultation_mode, password])
    return result.insertId
}
export const getAllDoctors = async() => {
    const sql = `SELECT * FROM doctors`
    const [doctors] = await pool.execute(sql)
    return doctors
};
export const getDoctorById = async(id)=>{
    const sql = `SELECT * FROM doctors WHERE doctor_id = ?`
    const [doctors] = await pool.execute(sql, [id])
    return doctors[0]
}
export const updateDoctorById = async(id, doctor)=>{
    const {first_name, last_name, email, phone_number, specialization, availability, consultation_mode,password} = doctor
    const sql = `UPDATE doctors SET first_name=?, last_name=?, email=?, phone_number=?, specialization=?, availability=?, consultation_mode=?, hash_password=? WHERE doctor_id=?`
    const [result] = await pool.execute(sql,[first_name, last_name, email, phone_number, specialization, JSON.stringify(availability), consultation_mode,password, id])
    return result.affectedRows
}
export const deleteDoctorById = async(id)=>{
    const sql = `DELETE FROM doctors WHERE doctor_id=?`
    const [result] = await pool.execute(sql, [id])
    return result.affectedRows
}