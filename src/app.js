import express from 'express'
import cors from 'cors'

import indexRuta from './routes/indexRoute.js'
import personaRoute from './routes/personaRoute.js'
import estudiantesRoute from './routes/estudiantesRoute.js'
import authRoute from './routes/authRoute.js'
import cursoRoute from './routes/cursoRoute.js'
import comentarioRoute from './routes/comentarioRoute.js'
import notificacionRoute from './routes/notificacionRoute.js'
import seInscribeRoute from './routes/seInscribeRoute.js'
import instructorRoute from './routes/instructorRoute.js'
import seccionRoute from './routes/seccionRoute.js'
import videoRoute from './routes/videoRoute.js'
import foroRoute from './routes/foroRoute.js'
import verifyToken from './authTok/verifyToken.js'

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())  
app.use(cors({origin:'*'}))

app.use(indexRuta)
app.use('/api',authRoute)
app.use('/api',cursoRoute)
app.use('/api',comentarioRoute)
app.use('/api',notificacionRoute)
app.use('/api',seInscribeRoute)
app.use('/api',seccionRoute)
app.use('/api',videoRoute)
app.use('/api',foroRoute)
app.use('/api',instructorRoute)
//app.use(verifyToken)
app.use('/api', personaRoute)
app.use('/api', estudiantesRoute)

app.use((req,res,next) =>{
    res.status(404).json({
        messaje: 'endpoint not found'
    })
})

export default app