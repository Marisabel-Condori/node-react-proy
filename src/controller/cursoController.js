import { pool } from '../database.js'

export const getCurso = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT c.*, p.nombre FROM curso c, persona p WHERE c.idInstructor=p.idpersona')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ messaje: error })
    }
}

export const getCursoByCategoria = async (req, res) => {
    var categoria = req.query.categoria
    try {
        const [rows] = await pool.query('SELECT c.*, p.nombre FROM curso c, persona p  WHERE c.idInstructor=p.idpersona AND c.categoria = ?', [categoria])
        console.log(rows);
        res.json(rows) 
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET by' })
    }
}

export const getCursoByEstudiante = async (req, res) => {
    var idestudiante = req.query.idestudiante
    try {
        const [rows] = await pool.query('SELECT c.*, p.nombre, se.fecha FROM se_inscribe se,curso c, persona p WHERE se.idcurso = c.idcurso AND p.idpersona = c.idInstructor AND se.idestudiante = ?', [idestudiante])
        console.log(rows);
        res.json(rows) 
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET by' })
    }
}

export const getCursoByInstructor = async (req, res) => {
    var idInstructor = req.query.idInstructor
    try {
        const [rows] = await pool.query('SELECT c.*,p.nombre FROM curso c, persona p WHERE c.idInstructor = p.idpersona AND c.idInstructor = ?', [idInstructor])
        console.log(rows);
        res.json(rows) 
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET by' })
    }
}

export const createCurso = async (req, res) => {
    var titulo_curso = req.query.titulo_curso;
    var descripcion_curso = req.query.descripcion_curso;
    var requisitos = req.query.requisitos;
    var categoria = req.query.categoria;
    var portada_curso = req.query.portada_curso;
    var idInstructor = req.query.idInstructor;
    try {
        const [rows] = await pool.query('INSERT INTO curso(titulo_curso, descripcion_curso, requisitos, categoria, portada_curso, idInstructor) VALUES (?,?,?,?,?,?)', [titulo_curso, descripcion_curso, requisitos, categoria, portada_curso, idInstructor])
        console.log(rows.insertId);
        res.json({ status:"exitoso",  message: 'ingreso exitoso', idC:rows.insertId })
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