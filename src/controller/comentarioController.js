import { pool } from '../database.js'

//INSERT INTO `comentario` ( `idvideo`, `idpersona`, `fecha`, `comentario`, `idrespuesta`) VALUES ( '1', '140', '01-01-2023', 'prueba comentario 1', NULL);

export const getComentario = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM comentario')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET' })
    }
}

export const getComentariosByIdVideo = async (req, res) => {
    var idvideo = req.query.idvideo
    try {
        const [rows] = await pool.query('SELECT * FROM comentario WHERE idvideo = ? order by fecha', [idvideo])
        console.log(rows);
        const rowsRespuestas = [];
        rows.forEach(comentario => {
            if (comentario.idrespuesta == null) {
                rowsRespuestas.push(comentario);
                rows.forEach(respuestas => {
                    if (respuestas.idrespuesta == comentario.idcomentario) {
                        rowsRespuestas.push(respuestas)
                    }
                });
            }
        });
        console.log('============>>>>>>> rowsRespuestas');
        console.log(rowsRespuestas);
        console.log('============>>>>>>> rowsRespuestas');
        res.json(rowsRespuestas)
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET by' })
    }
}

export const getComentariosByIdInstructor = async (req, res) => {
    var idinstructor = req.query.idinstructor
    try {
        const [rows] = await pool.query(
            'SELECT c.titulo_curso, v.titulo, co.comentario, pe.nombre,pe.ap_paterno, v.idvideo, co.idpersona, co.idcomentario' +
            ' FROM video v, seccion s, curso c, comentario co, persona pe' +
            ' WHERE v.idseccion = s.idseccion AND pe.idpersona = co.idpersona AND s.idcurso = c.idcurso AND co.idvideo = v.idvideo AND co.idrespuesta is NULL AND c.idInstructor = ?', [idinstructor])
        console.log('---------------------- getComentariosByIdInstructor -----------------------');
        console.log(rows);
        console.log('-----------------------------------------------------------');
        res.json(rows)
    } catch (error) {
        return res.status(500).json({ messaje: 'Algo salio mal GET getComentariosByIdInstructor' })
    }
}

export const createComentario = async (req, res) => {
    var idvideo = req.query.idvideo;
    var idpersona = req.query.idpersona;
    var comentario = req.query.comentario;
    var fecha = req.query.fecha;

    /// fecha = 1899-11-30T04:27:40.000Z
    //  fecha.replace('T', ' ');
    // fechac = fecha.substring(0, fecha.length()-2)
    console.log(fecha);
    var idrespuesta = req.query.idrespuesta;
    try {
        console.log('---------------------insert INTO------------------------------');
        console.log('idvi ' + idvideo + 'idper' + idpersona + 'comentario ' + comentario + ' fecha ' + fecha + 'idrespuesta' + idrespuesta)
        console.log('------------------------------');
        const [rows] = await pool.query('INSERT INTO comentario(idvideo, idpersona, comentario, fecha, idrespuesta) VALUES (?,?,?,?,?)', [idvideo, idpersona, comentario, fecha, idrespuesta])
        console.log(rows.insertId);
        res.json({ status: "exitoso", message: 'ingreso exitoso', id: rows.insertId })
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