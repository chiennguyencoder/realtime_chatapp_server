import express from 'express'
import morgan from 'morgan'
import * as db from './config/db.config.js'


const app = express()
const port = 3000

db.connect() // Connect to database
app.use(morgan('dev')) // HTTP request logger

app.get('/tin-tuc', (req, res) => {
    res.send('Hello world!! How do you do it')
})

app.listen(port, () => console.log(`The chat app listening at http://localhost:${port}`))