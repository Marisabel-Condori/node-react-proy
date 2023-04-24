import { pool } from '../database.js'

export const getseccion = async (req,res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM seccion')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ messaje: error })
    }
}

export const getseccionByIdCurso = async (req, res) => { 
    var idCurso = req.query.idcurso
    try {
        const [rows] = await pool.query('SELECT * FROM seccion WHERE idcurso = ?', [idCurso])
        console.log(rows);
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET by' })
    }
}

export const createseccion = async (req, res) => {
    var nombre_seccion = req.query.nombre_seccion;
    var idcurso = req.query.idcurso;
    try {
        const [rows] = await pool.query('INSERT INTO seccion(idcurso, nombre_seccion) VALUES (?,?)', [idcurso, nombre_seccion])
        console.log(rows);
        res.json({ status:"exitoso",  message: 'ingreso exitoso', insertId: rows.insertId })
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal POST' })
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