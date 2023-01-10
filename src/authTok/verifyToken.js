import jwt from "jsonwebtoken";
import { TOKEN_KEY } from '../config.js'

// const verifyToken = (req, res, next) => {
//     // const authHeader = req.headers['authorizacion']
//     const authHeader = req.query.token['authorizacion']
//     const token = authHeader && authHeader.split(' ')[1];
//     console.log(authHeader);
//     if (token === null) return res.status(401).send('Token requerido')
//     jwt.verify(token, TOKEN_KEY, (err, user) => {
//         // if (token === null) return res.status(403).send('Token invalido')
//         console.log(user);
//         req.user = user;
//         next();
//     })
// }

const verifyToken =(req, res, next)=>{
    const token = req.query.token || req.body.token || req.headers['x-acces-token'];
    // const token = req.query.token || req.body.token || req.headers['autorizacion'];
    if (token) {
        jwt.verify(token, TOKEN_KEY, (err, decoded)=>{
            if (err) {
                return res.json({status:'error', message:'autenticacion fallida'})
            } else {
                req.decoded = decoded;
                next()
            }
        })
    } else {
        return res.status(403).send({ status:'error', message: 'no existe el TOKEN'})
    }
}

export default verifyToken