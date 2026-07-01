import { HttpStatusCode } from "axios"
import type { Request, Response } from "express"

export function PingRoute(req: Request, res: Response) {
	return res.status(HttpStatusCode.Ok).send({
		status: "Ok",
		statusCode: HttpStatusCode.Ok,
		message: "Pong"
	})
}
