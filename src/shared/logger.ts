import type { NextFunction, Request, Response } from "express"

export function Logger(req: Request, res: Response, next: NextFunction) {
	const method = req.method
	const url = req.url
	const status = res.statusCode

	console.log(GetLogString(status, "LOG", method, url))

	res.on("finish", () => {
		if (status >= 400) {
			console.error(GetLogString(status, "ERROR", method, url))
		}
	})

	next()
}

export const GetLogString = (
	status: number,
	level: "LOG" | "ERROR" | "AXIOS",
	method: string = "",
	path: string = "",
	cause: string = ""
): string =>
	`[${new Date().toISOString()}] ${level} ${method} ${path} - Status: ${status}${status >= 400 && !!cause ? `. Cause: ${cause}` : ""}`
