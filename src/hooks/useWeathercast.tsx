import { useEffect, useState } from 'react'
import { TCity, TForecast } from '../types'
import { weatherData } from '../utils/open-meteo-forecast'

const params = {
  hourly: 'temperature_2m',
  daily: [
    'temperature_2m_max',
    'temperature_2m_min',
    'sunrise',
    'sunset',
    'wind_direction_10m_dominant',
  ],
  timezone: 'Europe/Berlin',
}

export const useWeathercast = (
  selectedCity: TCity | null,
  temp: 'celsius' | 'fahrenheit'
) => {
  const [forecast, setForecast] = useState<TForecast[] | null>(null)
  const [isPending, setIsPending] = useState(false)

  const fetchWeather = async (params: any) => {
    let response = await weatherData(params)
    setForecast(response)
  }

  useEffect(() => {
    setIsPending(true)
    selectedCity &&
      fetchWeather({
        ...params,
        latitude: selectedCity?.latitude,
        longitude: selectedCity?.longitude,
        temperature_unit: temp,
      })

    setIsPending(false)
  }, [selectedCity, temp])

  return { forecast, isPending }
}
