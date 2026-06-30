import axios, { AxiosError, HttpStatusCode } from "axios"
import type { Request, Response } from "express"
import { APP_ID, STEAM_MEDIA_URL, STEAM_URL } from "../shared/constants"
import { ThrowError } from "../shared/errors"
import { GetLogString } from "../shared/logger"
export async function StatsRoute(req: Request, res: Response) {
	const API_KEY = process.env.API_KEY

	if (!API_KEY) return ThrowError(res, HttpStatusCode.InternalServerError)

	const steamId = req.query.steam_id

	if (!steamId) return ThrowError(res, HttpStatusCode.BadRequest, "'steam_id' value is required")

	if (Number.isNaN(Number.parseInt(steamId as string, 10))) return ThrowError(res, HttpStatusCode.BadRequest, "Invalid steam_id format")

}
