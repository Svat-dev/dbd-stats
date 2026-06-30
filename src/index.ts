import "dotenv/config"

import express from "express"
import { Logger } from "./shared/logger"

const app = express()

app.disable("x-powered-by")

app.use(Logger)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
