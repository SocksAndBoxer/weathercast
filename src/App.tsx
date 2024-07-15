import { SetStateAction, useState } from 'react'
import './App.css'
import { useGeolocation } from './hooks/useGeolocation'
import { TCity } from './types'
import Cities from './components/Cities'
import { useWeathercast } from './hooks/useWeathercast'
import DailyForecast from './components/DailyForecast'

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
            <DailyForecast day={day} />
          ))}
        </section>
      )}
    </div>
  )
}

export default App
