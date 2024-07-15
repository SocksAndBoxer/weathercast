import { fetchWeatherApi } from 'openmeteo'
import { TForecast, THourly } from '../types'

const url = 'https://api.open-meteo.com/v1/forecast'

// Process first location. Add a for-loop for multiple locations or weather models
export const weatherData = async (params: any) => {
  const responses = await fetchWeatherApi(url, params)
  const response = responses[0]

  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds()

  const hourly = response.hourly()!
  const daily = response.daily()!

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map(t => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0)!.valuesArray()!,
    },
    daily: {
      time: range(
        Number(daily.time()),
        Number(daily.timeEnd()),
        daily.interval()
      ).map(t => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2mMax: daily.variables(0)!.valuesArray()!,
      temperature2mMin: daily.variables(1)!.valuesArray()!,
      sunrise: daily.variables(2)!.valuesArray()!,
      sunset: daily.variables(3)!.valuesArray()!,
      windDirection10mDominant: daily.variables(4)!.valuesArray()!,
    },
  }

  console.log(weatherData)

  let dailyWeather: TForecast[] = []

  for (let i = 0; i < weatherData.daily.time.length; i++) {
    const { daily, hourly } = weatherData
    dailyWeather = [
      ...dailyWeather,
      {
        date: daily.time[i],
        maxTemp: daily.temperature2mMax[i],
        minTemp: daily.temperature2mMin[i],
        windDirection: daily.windDirection10mDominant[i],
        hourly: hourly.time
          .map((date, index) => {
            if (date.getDate() !== daily.time[i].getDate()) {
              return null
            }

            return {
              hour: date,
              temperature: hourly.temperature2m[index],
            }
          })
          .filter((o): o is THourly => !!o),
      },
    ]
  }

  return dailyWeather
}
