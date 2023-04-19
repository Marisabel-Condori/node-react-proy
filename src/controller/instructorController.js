import { pool } from '../database.js'

export const getinstructor = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT p.*, a.email ' +
            'FROM instructor i, persona p, auth a ' +
            'WHERE p.idpersona=i.idpersona ' +
            'AND a.idpersona=p.idpersona ')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET' })
    }
}

export const getinstructorById = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM instructor WHERE idpersona = ?', [req.params.idpersona])
        console.log(rows);
        res.json(rows[0])
    } catch (error) { 
        return res.status(500).json({ messaje: 'Algo salio mal GET byem' })
    }
}
 
export const createInstructor = async (req, res) => {
    var idpersona = req.query.idpersona;
    // var especialidad = req.query.especialidad;
    // var experiencia = req.query.experiencia;
    try {
        const [rows] = await pool.query('INSERT INTO instructor(idpersona) VALUES (?)', [idpersona])
        console.log(rows);
        res.json({ status: "exitoso", message: 'ingreso exitoso' })
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal POST' })
    }
}

export const updateInstructor= async (req, res) => {
    const  {idpersona}  = req.query
    const { nombre, ap_paterno, correo, celular } = req.query
    try {
        const [result] = await pool.query( 'UPDATE persona p, auth a '+
            'SET p.nombre = ?,  p.ap_paterno = ?, a.email = ?, p.celular = ? '+
            'WHERE p.idpersona = a.idpersona '+
            'AND p.idpersona = ?', [nombre, ap_paterno, correo, celular, idpersona])
        console.log(result);
        if (result.affectedRows === 0) return res.status(404).json({
            messaje: "Persona no encontrada - update"
        })
        const [rows] = await pool.query('SELECT * FROM persona WHERE idpersona=?', [idpersona])
        res.json({status:"exitoso", message:'edicion exitosa'})
        // res.json({status:"exitoso", message:'edicion exitosa', data:rows[0]})
        
        // res.json('recibido')
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal UPDATE' })
    }
}

// // DELETE y UPDATE pendiente. Arreglar en la BASE DE DATOS con ON DELETE CASCADE
export const deleteInstructor = async (req, res) => {
    var  idpersona  = req.query.idpersona
    try {
        const [result] = await pool.query('DELETE FROM instructor WHERE idpersona = ?', [idpersona])
            if (result.affectedRows <= 0) return res.status(404).json({
            status:"error", message: "Persona no encontrada"
        })
        // res.sendStatus(204)
        // res.send('persona eliminada')
        res.json({ status:"exitoso",  message: 'eliminacion exitosa'})
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal DELETE' })
    }
}
