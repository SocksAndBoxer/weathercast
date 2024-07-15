import { TForecast, THourly } from '../types'
import { degreesToDirection } from '../utils/degrees-to-direction'

type DailyForecastProps = {
  day: TForecast
  handleHourlyForecast: (hourly: THourly[]) => void
}

const DailyForecast = ({ day, handleHourlyForecast }: DailyForecastProps) => {
  return (
    <>
      <div
        className='cursor-pointer'
        onClick={() => handleHourlyForecast(day.hourly)}
      >
        <h3>{day.date!.toLocaleDateString('en', { weekday: 'long' })}</h3>
        <p>
          {Math.round(day.minTemp)}° - {Math.round(day.maxTemp)}°
        </p>
        <p>Wind direction: {degreesToDirection(day.windDirection)}</p>
      </div>
    </>
  )
}

export default DailyForecast
