import { pool } from '../database.js'

export const getInscribe = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM se_inscribe')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET' })
    }
}

export const getInscritosByEstudiante = async (req, res) => {
    var idestudiante = req.query.idestudiante
    try {
        const [rows] = await pool.query('SELECT * FROM se_inscribe WHERE idestudiante = ?', [idestudiante])
        console.log(rows);
        res.json(rows) 
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET by seinscribe' })
    }
} 

export const estaInscrito = async (req, res) => {
    var idestudiante = req.query.idestudiante
    var idcurso = req.query.idcurso
    try {
        const [rows] = await pool.query('SELECT * FROM se_inscribe WHERE idestudiante=? AND idcurso =?', [idestudiante, idcurso])
        console.log(rows);
        res.json(rows) 
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET by seinscribe' })
    }
}

export const createInscribe = async (req, res) => {
    var idcurso = req.query.idcurso;
    var idestudiante = req.query.idestudiante;
    var fecha = req.query.fecha;
    try {
        const [rows] = await pool.query('INSERT INTO se_inscribe(idcurso, idestudiante, fecha) VALUES (?,?,?)', [idcurso, idestudiante, fecha])
        console.log(rows.insertId);
        res.json({ status:"exitoso",  message: 'ingreso exitoso', id:rows.insertId })
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