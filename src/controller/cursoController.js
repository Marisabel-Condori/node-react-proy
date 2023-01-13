import { pool } from '../database.js'

export const getCurso = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM curso')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET' })
    }
}

export const getCursoById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM idcurso WHERE idcurso = ?', [req.params.idcurso])
        console.log(rows);
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET byem' })
    }
}

export const createCurso = async (req, res) => {
    var titulo_curso = req.query.titulo_curso;
    var descripcion_curso = req.query.descripcion_curso;
    var requisitos = req.query.requisitos;
    try {
        const [rows] = await pool.query('INSERT INTO curso(titulo_curso, descripcion_curso, requisitos) VALUES (?,?,?)', [titulo_curso, descripcion_curso, requisitos])
        res.json({ status:"exitoso",  message: 'ingreso exitoso' })
    } catch (error) {
        // return res.status(500).json({ messaje: 'Algo salio mal POST' })
        console.log(error);
    }
}

// // DELETE y UPDATE pendiente. Arreglar en la BASE DE DATOS con ON DELETE CASCADE
// export const deletePersona = async (req, res) => {
//     try {
//         console.log(req.params.idpersona);
//         const [result] = await pool.query('DELETE FROM persona WHERE idpersona = ?', [req.params.idpersona])
//         if (result.affectedRows <= 0) return res.status(404).json({
//             message: "Persona no encontrada"
//         })
//         res.sendStatus(204)
//         res.send('persona eliminada')
//     } catch (error) {
//         return res.status(500).json({ messaje: 'Algo salio mal DELETE' })
//     }
// }
// export const updatePersona = async (req, res) => {
//     const { idpersona } = req.params
//     const { nombre, ap_paterno, correo, password } = req.body
//     try {
//         const [result] = await pool.query(
//             'UPDATE persona SET nombre=IFNULL(?,nombre), ap_paterno=IFNULL(?,ap_paterno), correo=IFNULL(?, correo), password=IFNULL(?,password) WHERE idpersona=?', [nombre, ap_paterno, password, correo, idpersona])
//         console.log(result);
//         if (result.affectedRows === 0) return res.status(404).json({
//             messaje: "Persona no encontrada - update"
//         })
//         const [rows] = await pool.query('SELECT * FROM persona WHERE idpersona=?', [idpersona])
//         res.json(rows[0])
//         res.json('recibido')
//     } catch (error) {
//         return res.status(500).json({ messaje: 'Algo salio mal UPDATE' })
//     }
//}