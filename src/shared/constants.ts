export const APP_ID = 381210

export const STEAM_URL = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001"

export const STEAM_MEDIA_URL = (id: string) => `https://media.steampowered.com/steamcommunity/public/images/apps/${APP_ID}/${id}.jpg`
