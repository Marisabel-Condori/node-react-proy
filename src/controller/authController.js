import { pool } from '../database.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { TOKEN_KEY } from '../config.js';


export const loginauth = async (req, res) => {
    var correo = req.query.correo;
    var password = req.query.password;
    try {
        const [buscaEmailBD] = await pool.query('SELECT * FROM auth WHERE email = ? ', [correo])
        const [datosPersona] = await pool.query('SELECT * FROM persona WHERE idpersona = ? ', [buscaEmailBD[0].idpersona])
        if (buscaEmailBD.length === 0) return res.json({ status: "error", message: "Email incorrecto" })
        else {
            const pass = await bcrypt.compare(password, buscaEmailBD[0].password)
            if (pass) {
                //generar un TOKEN 
                const token = jwt.sign({ userId: buscaEmailBD[0].idauth, email: buscaEmailBD[0].email }, TOKEN_KEY, { expiresIn: '5m' })
                console.log(buscaEmailBD[0]);
                console.log(token);
                return res.json({ status: "exito", token: token, id: buscaEmailBD[0].idpersona, nombre:datosPersona[0].nombre})

            } else { return res.json({ status: "error", message: "Password incorrecto" }) }
        }
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET' })
    }
}

export const logoutauth = async (req, res) => {
    //res.clea('jwt')
    //res.redirect('/')
}

export const createauth = async (req, res) => {
    console.log("################################## MI PRUEBA ####");
    console.log(req.query);
    console.log("################################## MI PRUEBA ####");
    var nombre = req.query.nombre;
    var apellidos = req.query.ap_paterno;
    // var ap_materno = req.body.ap_materno;
    var correo = req.query.correo;
    var password = req.query.password;
    // var password = '';
    // var depto = req.query.departamento;
    try {
        const [buscaEmailBD] = await pool.query('SELECT * FROM auth WHERE email = ?', [correo])
        console.log(buscaEmailBD);
        console.log(buscaEmailBD.length);
        // res.json(buscaEmailBD[0])
        if (buscaEmailBD.length > 0) { res.json({ status: "error", message: "Email ya fue registrado" }) }
        else {
            const salt = await bcrypt.genSalt(6);  
            password = await bcrypt.hash(password, salt)

            const [enviapersona] = await pool.query('INSERT INTO persona(nombre, ap_paterno ) VALUES (?,?)', [nombre, apellidos])
            const id = enviapersona.insertId

            const [enviaAuth] = await pool.query('INSERT INTO auth(email, password, idpersona ) VALUES (?,?,?)', [correo, password, id])
            //ADICIONAR CONDICION PARA INGRESAR A DOCENTE O ESTUDIANTE
            const [enviaEstudiante] = await pool.query('INSERT INTO estudiante(idpersona ) VALUES (?)', [id])
            // const [enviaEstudiante] = await pool.query('INSERT INTO instructor(idpersona ) VALUES (?)', [id])

            console.log(password);
            res.json({ id: id, status: "exitoso", message: 'autenticacion exitosa' })
            //res.redirect('/')
        }
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal POST' })
        // console.log(error);
    }
}

// DELETE y UPDATE pendiente. Arreglar en la BASE DE DATOS con ON DELETE CASCADE
// export const deleteauth = async (req, res) => {
//     try {
//         console.log(req.params.idauth);
//         const [result] = await pool.query('DELETE FROM auth WHERE idauth = ?', [req.params.idauth])
//         if (result.affectedRows <= 0) return res.status(404).json({
//             message: "auth no encontrada"
//         })
//         res.sendStatus(204)
//         res.send('auth eliminada')
//     } catch (error) {
//         return res.status(500).json({ messaje: 'Algo salio mal DELETE' })
//     }
// }
export const forgotauth = async (req, res) => {
    console.log(req);
    // const { idauth } = req.params
    // const { nombre, ap_paterno, correo, password } = req.body
    // try {
    //     const [result] = await pool.query(
    //         'UPDATE auth SET nombre=IFNULL(?,nombre), ap_paterno=IFNULL(?,ap_paterno), correo=IFNULL(?, correo), password=IFNULL(?,password) WHERE idauth=?', [nombre, ap_paterno, password, correo, idauth])
    //     console.log(result);
    //     if (result.affectedRows === 0) return res.status(404).json({
    //         messaje: "auth no encontrada - update"
    //     })
    //     const [rows] = await pool.query('SELECT * FROM auth WHERE idauth=?', [idauth])
    //     res.json(rows[0])
    //     res.json('recibido')
    // } catch (error) {
    //     return res.status(500).json({ messaje: 'Algo salio mal UPDATE' })
    // }
}