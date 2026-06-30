import axios, { AxiosError, HttpStatusCode } from "axios"
import type { Request, Response } from "express"
import { APP_ID, STEAM_MEDIA_URL, STEAM_URL } from "../shared/constants"
import { ThrowError } from "../shared/errors"
import { GetLogString } from "../shared/logger"
import type { SteamGamesResponse } from "../types/steam-response.type"

export async function StatsRoute(req: Request, res: Response) {
	const API_KEY = process.env.API_KEY

	if (!API_KEY) return ThrowError(res, HttpStatusCode.InternalServerError)

	const steamId = req.query.steam_id

	if (!steamId) return ThrowError(res, HttpStatusCode.BadRequest, "'steam_id' value is required")

	if (Number.isNaN(Number.parseInt(steamId as string, 10))) return ThrowError(res, HttpStatusCode.BadRequest, "Invalid steam_id format")

	try {
		const url = new URL(STEAM_URL)

		url.searchParams.append("include_appinfo", "1")
		url.searchParams.append("appids_filter[0]", String(APP_ID))
		url.searchParams.append("key", API_KEY)
		url.searchParams.append("steamid", steamId as string)
		url.searchParams.append("format", "json")

		const response = await axios.get<{ response: SteamGamesResponse }>(url.toString())
		const basicGameInfo = response.data.response.games[0]

		if (!basicGameInfo.has_community_visible_stats) ThrowError(res, HttpStatusCode.Conflict, "Your's profile must be public for stats!")

	} catch (e) {
		if (e instanceof AxiosError) {
			console.error(GetLogString(e.status || 500, "AXIOS", e.config?.method, "", JSON.stringify(e.response?.data)))
		}
		return ThrowError(res, HttpStatusCode.InternalServerError)
	}
}
