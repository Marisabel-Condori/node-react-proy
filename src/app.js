import express from 'express'
import personaRoute from './routes/personaRoute.js'
import indexRuta from './routes/indexRoute.js'

const app = express()

app.use(express.json())

app.use(indexRuta)
app.use('/api',personaRoute)

app.use((req,res,next) =>{
    res.status(404).json({
        messaje: 'endpoint not found'
    })
})

export default app