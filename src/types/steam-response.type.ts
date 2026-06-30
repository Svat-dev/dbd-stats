export interface SteamGamesResponse {
	game_count: number
	games: SteamGamesResponseGame[]
}

export interface SteamGamesResponseGame {
	appid: number
	name: string
	playtime_2weeks: number
	playtime_forever: number
	img_icon_url: string
	has_community_visible_stats: boolean
	playtime_disconnected: number
}
