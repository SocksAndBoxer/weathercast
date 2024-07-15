export type TCity = {
  id: number
  name: string // Paris
  latitude: number
  longitude: number
  country_code: string // FR
  timezone: string
  postcodes?: string[] | null
  country: string
  admin1: string
  admin2: string
  admin3: string
}

export type THourly = { hour: Date; temperature: number }

export type TForecast = {
  date: Date | null
  maxTemp: number
  minTemp: number
  windDirection: number
  hourly: THourly[]
}
