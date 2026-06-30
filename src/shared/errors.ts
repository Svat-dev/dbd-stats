import type { HttpStatusCode } from "axios"
import type { Response } from "express"

export function ThrowError(res: Response, status: HttpStatusCode, message: string): Response
export function ThrowError(res: Response, status: HttpStatusCode.InternalServerError): Response
export function ThrowError(res: Response, status: HttpStatusCode, message?: string): Response {
	return res.status(status).send({ message: message || "Something went wrong!" })
}
