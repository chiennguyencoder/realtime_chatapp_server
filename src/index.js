import express, { application } from 'express'
import morgan from 'morgan'
import * as db from './config/db.config.js'
import { ErrorHandler, AppError } from './middleware/ErrorHandler.js' 
import router from './apis/index.js'

const app = express()
const port = 3000

db.connect() // Connect to database
app.use(morgan('dev')) // HTTP request logger

app.use(express.json())

app.use('/api', router) // App router

app.use(ErrorHandler) // Error Handler

app.listen(port, () => console.log(`ℹ️  The chat app listening at http://localhost:${port}`))
