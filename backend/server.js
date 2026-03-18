import dotenv from 'dotenv/config'

import { connectDB } from './src/config/db.js'
import app from './src/app.js'
import { testAi } from './src/services/ai.service.js'

const PORT = process.env._PORT || 8000
// testAi()

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server is running on the port ", PORT)
    })
}).catch((err) => {
    console.log("something went wrong while connecting with the server ", err.message)
})


