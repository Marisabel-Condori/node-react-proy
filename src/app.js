import express from 'express'
import cors from 'cors'

import indexRuta from './routes/indexRoute.js'
import personaRoute from './routes/personaRoute.js'
import authRoute from './routes/authRoute.js'
import cursoRoute from './routes/cursoRoute.js'
import verifyToken from './authTok/verifyToken.js'

const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())  
app.use(cors({origin:'*'}))

app.use(indexRuta)
app.use(verifyToken)
app.use('/api',authRoute)
app.use('/api', personaRoute)
app.use('/api',cursoRoute)

app.use((req,res,next) =>{
    res.status(404).json({
        messaje: 'endpoint not found'
    })
})

export default app