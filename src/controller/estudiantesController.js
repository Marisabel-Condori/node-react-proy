import { pool } from '../database.js'

export const getEstudiantes = async (req,res) => {
    try {
        const [rows] = await pool.query('SELECT p.idpersona, p.nombre, p.ap_paterno, p.ci, esDocente(p.idpersona) AS esDocente '+
        'FROM estudiante e, persona p WHERE e.idpersona=p.idpersona')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET' })
    }
}

// DELETE y UPDATE pendiente. Arreglar en la BASE DE DATOS con ON DELETE CASCADE
export const deletePersona = async (req, res) => {
    try {
        console.log(req.params.idpersona);
        const [result] = await pool.query('DELETE FROM persona WHERE idpersona = ?', [req.params.idpersona])
        if (result.affectedRows <= 0) return res.status(404).json({
            message: "Persona no encontrada"
        })
        res.sendStatus(204)
        res.send('persona eliminada')
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal DELETE' })
    }
}
export const updatePersona = async (req, res) => {
    const { idpersona } = req.params
    const { nombre, ap_paterno, correo, password } = req.body
    try {
        const [result] = await pool.query(
            'UPDATE persona SET nombre=IFNULL(?,nombre), ap_paterno=IFNULL(?,ap_paterno), correo=IFNULL(?, correo), password=IFNULL(?,password) WHERE idpersona=?', [nombre, ap_paterno, password, correo, idpersona])
        console.log(result);
        if (result.affectedRows === 0) return res.status(404).json({
            messaje: "Persona no encontrada - update"
        })
        const [rows] = await pool.query('SELECT * FROM persona WHERE idpersona=?', [idpersona])
        res.json(rows[0])
        res.json('recibido')
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal UPDATE' })
    }
}