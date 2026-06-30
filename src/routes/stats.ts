import axios, { AxiosError, HttpStatusCode } from "axios"
import { API } from "deadbydaylight.js"
import type { Request, Response } from "express"
import { APP_ID, STEAM_MEDIA_URL, STEAM_URL } from "../shared/constants.js"
import { ThrowError } from "../shared/errors.js"
import { GetLogString } from "../shared/logger.js"
import type { StatsResponse } from "../types/stats-response.type.js"
import type { SteamGamesResponse } from "../types/steam-response.type.js"

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

		const api = await API.fetchUser(steamId as string, API_KEY)

		const {
			bloodweb_max_points_in_one_category,
			bloodweb_total_points_spended,
			items_depleted,
			max_prestige_level,
			survivor_rank,
			killer_rank
		} = api.stats()

		const surv = api.survivor()
		const killer = api.killer()

		const result: StatsResponse<typeof surv, typeof killer> = {
			general: {
				game_name: basicGameInfo.name,
				icon_url: STEAM_MEDIA_URL(basicGameInfo.img_icon_url),
				playtime_forever: Math.round(basicGameInfo.playtime_forever / 60),
				playtime_2weeks: Math.round(basicGameInfo.playtime_2weeks / 60),
				bloodweb_max_points_in_one_category,
				bloodweb_total_points_spended,
				items_depleted,
				max_prestige_level
			},
			survivor: {
				rank: survivor_rank.rank_name,
				...surv,
				generators_done: Math.round(surv.generators_done),
				generators_broken_repaired: Math.round(surv.generators_broken_repaired),
				healing_done: Math.round(surv.healing_done),
				healing_being_injured: Math.round(surv.healing_being_injured),
				healing_being_obsession: Math.round(surv.healing_being_obsession),
				healing_while_rest_is_injured: Math.round(surv.healing_while_rest_is_injured)
			},
			killer: {
				rank: killer_rank.rank_name,
				...killer
			}
		}

		return res.status(HttpStatusCode.Ok).send(result)
	} catch (e) {
		if (e instanceof AxiosError) {
			console.error(GetLogString(e.status || 500, "AXIOS", e.config?.method, "", JSON.stringify(e.response?.data)))
		}
		return ThrowError(res, HttpStatusCode.InternalServerError)
	}
}
