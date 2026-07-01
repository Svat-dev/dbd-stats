import "dotenv/config"

import express from "express"
import * as path from "node:path"
import { fileURLToPath } from "node:url"
import { StatsRoute } from "./routes/stats.js"
import { Logger } from "./shared/logger.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.disable("x-powered-by")

app.use(Logger)

app.use(express.static(path.join(__dirname, "..", "public")))

app.get("/dbd/stats", StatsRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
