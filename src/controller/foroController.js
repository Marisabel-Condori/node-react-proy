import { pool } from '../database.js'

export const getforo = async (req,res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM foro')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ messaje: error })
    }
}

export const getforoById = async (req, res) => {
    var idForo = req.query.idforo
    try {
        const [rows] = await pool.query('SELECT * FROM foro WHERE idforo = ?', [idForo])
        console.log(rows);
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET byem' })
    }
}

// export const createforo = async (req, res) => {
//     var tituloforo = req.query.titulo;
//     var urlforo = req.query.urlforo;
//     var idSeccion = req.query.idseccion;
//     try {
//         const [rows] = await pool.query('INSERT INTO foro(titulo, urlforo, idseccion) VALUES (?,?,?)', [tituloforo, urlforo, idSeccion])
//         console.log(rows);
//         res.json({ status:"exitoso",  message: 'ingreso exitoso' })
//     } catch (error) {
//         return res.status(500).json({ messaje: 'Algo salio mal POST' })
//     }
// }

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