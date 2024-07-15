import { SetStateAction, useState } from 'react'
import './App.css'
import { useGeolocation } from './hooks/useGeolocation'
import { TCity, THourly } from './types'
import Cities from './components/Cities'
import { useWeathercast } from './hooks/useWeathercast'
import { degreesToDirection } from './utils/degrees-to-direction'

function App() {
  const [city, setCity] = useState('')
  const [toggledTemp, setToggledTemp] = useState<'celsius' | 'fahrenheit'>(
    'celsius'
  )
  const [selectedCity, setSelectedCity] = useState<TCity | null>(null)
  const { cities, isPending, error, fetchCitiesData } = useGeolocation(city)
  const { forecast, isPending: isWeathercastPending } = useWeathercast(
    selectedCity,
    toggledTemp
  )

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedCity(null)
    setCity(e.target.value)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    fetchCitiesData()
  }

  const handleCitySelection = (city: TCity) => {
    setSelectedCity(city)
    setCity(city.name)
  }

  const handleHourlyForecast = (hourly: THourly[]) => {
    console.log(hourly)
  }

  return (
    <div>
      <h1>Weather Forecast in your city</h1>
      <button
        onClick={() =>
          setToggledTemp((oldTemp: string) =>
            oldTemp === 'celsius' ? 'fahrenheit' : 'celsius'
          )
        }
      >
        Temperature : {toggledTemp}
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter city name'
          value={city}
          onChange={handleInputChange}
        />
        <button type='submit'>Get Weather</button>
      </form>
      {cities && !selectedCity && (
        <Cities
          handleCitySelection={handleCitySelection}
          isPending={isPending}
          error={error}
          cities={cities}
        />
      )}
      {forecast && !isWeathercastPending && (
        <section>
          {forecast.map(day => (
            <div onClick={() => handleHourlyForecast(day.hourly)}>
              <h3>{day.date!.toLocaleDateString('en', { weekday: 'long' })}</h3>
              <p>
                {Math.round(day.minTemp)}° - {Math.round(day.maxTemp)}°
              </p>
              <p>Wind direction: {degreesToDirection(day.windDirection)}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

export default App
