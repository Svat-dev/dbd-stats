import { HttpStatusCode } from "axios"
import type { Request, Response } from "express"

export function IndexRoute(req: Request, res: Response) {
	const response = {
		message: "Welcome to Dead by Daylight stats API",
		description: "It's API for DiscordWidgets and for simple usage",
		routes: ["/", "/ping", "/dbd/stats", "/media/{folder}/{name}.ext"]
	}

	return res.status(HttpStatusCode.Ok).send(response)
}
