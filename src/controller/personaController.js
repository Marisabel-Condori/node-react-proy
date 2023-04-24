import { pool } from '../database.js'
import bcrypt from 'bcrypt'

export const getPersona = async (req,res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM persona')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ messaje: error })
    }
}

export const getesEstudianteDocente = async (req, res) => {
    var idpersona = req.query.idpersona
    try {
        const [rowsE] = await pool.query('SELECT * FROM estudiante WHERE idpersona = ?', [idpersona])
        const [rowsD] = await pool.query('SELECT * FROM instructor WHERE idpersona = ?', [idpersona])
        console.log('+++++++++++++ ES ESTUDIANTE +++++++++++++++');
        console.log(rowsE.length);
        console.log('-------------- ES DOCENTE------------------');
        console.log(rowsD.length);
        console.log('++++++++++++++++++++++++++++++++++++++++');
        res.json({ estudiante: rowsE.length, docente:rowsD.length })
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET esetudiantedocente' })
    }
}

export const getPersonaByEmail = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM persona WHERE correo = ?', [req.params.correo])
        console.log(rows);
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET byem' })
    }
}

export const createPersona = async (req, res) => {
    console.log("################################## MI PRUEBA ####");
    console.log(req.query);
    console.log("################################## MI PRUEBA ####");
    var nombre = req.query.nombre;
    var apellidos = req.query.ap_paterno;
    // var ap_materno = req.body.ap_materno;
    var correo = req.query.correo;
    var Npassword = req.query.password;
    var password = '';
    // var depto = req.query.departamento;
    try {
        const [buscaEmailBD] = await pool.query('SELECT * FROM persona WHERE correo = ?', [correo])
        console.log(buscaEmailBD);
        console.log(buscaEmailBD.length);
        // res.json(buscaEmailBD[0])
        if (buscaEmailBD.length > 0) { res.json({ status: "error", error: "Email ya fue registrado" }) }
        else {
            const salt = await bcrypt.genSalt(8);
            password = await bcrypt.hash(Npassword, salt)

            const [enviaPersona] = await pool.query('INSERT INTO persona(nombre, ap_paterno, correo ) VALUES (?,?,?)', [nombre, apellidos, correo])
            const id = enviaPersona.insertId

            const [enviaAuth] = await pool.query('INSERT INTO auth(idauth, email, password ) VALUES (?,?,?)', [id,correo, password])
            const [enviaEstudiante] = await pool.query('INSERT INTO estudiante(idpersona ) VALUES (?)', [id])

            console.log(password);
            res.json({ status:"exitoso",  message: 'autenticacion exitosa' })
        }

        // const [rows] = await pool.query('INSERT INTO persona(nombre, ap_paterno, correo, password ) VALUES (?,?,?,?)', [nombre, apellidos, correo, password])
        // console.log(rows.insertId);
        // res.send({ id: rows.insertId }) 
    } catch (error) {
        // return res.status(500).json({ messaje: 'Algo salio mal POST' })
        console.log(error);
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