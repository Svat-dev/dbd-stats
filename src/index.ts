import "dotenv/config"

import express from "express"
import { StatsRoute } from "./routes/stats.js"
import { Logger } from "./shared/logger.js"

const app = express()

app.disable("x-powered-by")

app.use(Logger)

app.get("/dbd/stats", StatsRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
