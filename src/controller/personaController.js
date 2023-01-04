import { pool } from '../database.js'

export const getPersona = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM persona')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET'})
    }
}

export const getPersonaByEmail = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM persona WHERE correo = ?', [req.params.correo])
        console.log(rows);
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET byem'})
    }
}

export const createPersona = async (req, res) => {
    const { nombre, ap_paterno, correo, password } = req.body
    try {
        const [rows] = await pool.query('INSERT INTO persona(nombre, ap_paterno, correo, password) VALUES (?,?,?,?)', [nombre, ap_paterno, correo, password])
        console.log(req.body)
        //console.log(rows);
        res.send({ id: rows.insertId, nombre, ap_paterno, correo, password })
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal POST'})
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
        return res.status(500).json({ messaje: 'Algo salio mal DELETE'})
    }
}
export const updatePersona = async (req, res) => {
    const { idpersona } = req.params
    const { nombre, ap_paterno, correo, password } = req.body
    try {
        const [result] = await pool.query(
            'UPDATE persona SET nombre=IFNULL(?,nombre), ap_paterno=IFNULL(?,ap_paterno), correo=IFNULL(?, correo), password=IFNULL(?,password) WHERE id=?', [nombre, ap_paterno, password, correo, idpersona])
        console.log(result);
        if (result.affectedRows === 0) return res.status(404).json({
            messaje: "Persona no encontrada - update"
        })
        const [rows] = await pool.query('SELECT * FROM employee WHERE id=?', [id])
        res.json(rows[0])
        res.json('recibido')
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal UPDATE'})
    }
}