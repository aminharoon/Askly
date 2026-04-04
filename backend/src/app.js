import express from 'express'
import cookieParser from 'cookie-parser'
import { handleError } from './middleware/Error.middleware.js'
import cors from 'cors'
import morgan from "morgan"


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: " http://localhost:5173",
    credentials: true
}))
app.use(morgan("dev"))
/**import routes */
import AuthRoutes from './routes/auth.routes.js'
import chatRoutes from './routes/chat.routes.js'


app.use("/api/auth", AuthRoutes)
app.use("/api/chats", chatRoutes)


app.use(handleError)
export default app