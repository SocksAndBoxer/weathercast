import { TForecast, THourly } from '../types'
import { degreesToDirection } from '../utils/degrees-to-direction'

type DailyForecastProps = {
  day: TForecast
  handleHourlyForecast: (hourly: THourly[]) => void
  selected: boolean
}

const DailyForecast = ({
  day,
  handleHourlyForecast,
  selected,
}: DailyForecastProps) => {
  return (
    <div
      className={`cursor-pointer border-2 rounded-md p-4 ${
        selected ? '[text-shadow:_0_1px_0_rgb(0_0_0_/_80%)]' : ''
      }`}
      onClick={() => handleHourlyForecast(day.hourly)}
    >
      <h3>{day.date!.toLocaleDateString('en', { weekday: 'long' })}</h3>
      <p>
        {Math.round(day.minTemp)}° - {Math.round(day.maxTemp)}°
      </p>
      <p>Wind direction: {degreesToDirection(day.windDirection)}</p>
    </div>
  )
}

export default DailyForecast
