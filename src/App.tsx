import { SetStateAction, useState } from 'react'
import './App.css'
import { useGeolocation } from './hooks/useGeolocation'
import { TCity } from './types'
import Cities from './components/Cities'

function App() {
  const [city, setCity] = useState('')
  const [selectedCity, setSelectedCity] = useState<TCity | null>(null)
  const { cities, isPending, error, fetchCitiesData } = useGeolocation(city)

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
    </div>
  )
}

export default App
