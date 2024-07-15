import { THourly } from '../types'

type HourlyForecastProps = {
  hours: THourly
}

const HourlyForecast = ({ hours }: HourlyForecastProps) => {
  return (
    <div>
      <p>{hours.hour.getHours()}h</p>
      <p>{Math.round(hours.temperature)}°</p>
    </div>
  )
}

export default HourlyForecast
