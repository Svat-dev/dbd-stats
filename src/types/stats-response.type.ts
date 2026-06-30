export interface StatsResponse<S, K> {
	general: General
	survivor: Survivor<S>
	killer: Killer<K>
}

interface General {
	max_prestige_level: number
	items_depleted: number
	bloodweb_total_points_spended: number
	bloodweb_max_points_in_one_category: number
	playtime_forever: number
	playtime_2weeks: number
	icon_url: string
	game_name: string
}

type Survivor<T> = {
	rank: string
} & T

type Killer<T> = {
	rank: string
} & T
