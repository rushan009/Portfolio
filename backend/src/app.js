import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/adminroute.js'
import projectRouter from './routes/projectroute.js'
import skillRouter from './routes/skill.route.js'
import resumeRouter from './routes/resume.route.js'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/api/auth', authRouter)
app.use('/api', projectRouter)
app.use('/api', skillRouter)
app.use('/api', resumeRouter)

export default app