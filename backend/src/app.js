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



const allowedOrigins = [
    "http://localhost:5173",
    "https://rushandahal.com.np",
    "https://www.rushandahal.com.np",
    "https://portfolio-fhgy.vercel.app",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}))

app.get("/", (req, res) => {
    res.json({ message: "Portfolio API is running" });
});

app.use('/api/auth', authRouter)
app.use('/api', projectRouter)
app.use('/api', skillRouter)
app.use('/api', resumeRouter)

export default app