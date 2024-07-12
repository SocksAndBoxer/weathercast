import { SetStateAction, useState } from 'react'
import './App.css'
import { useGeolocation } from './hooks/useGeolocation'
import { City } from './types'
import Cities from './components/Cities'

function App() {
  const [city, setCity] = useState('')
  const [selectedCity, setSelectedCity] = useState<City>()
  const { cities, isPending, error, fetchCitiesData } = useGeolocation(city)

  // console.log(cities, isPending, error)

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setCity(e.target.value)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    fetchCitiesData()
    // fetchData()
  }

  const handleCitySelection = (city: City) => {
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
      {cities && (
        <>
          {!error && !isPending && cities && (
            <Cities handleCitySelection={handleCitySelection} cities={cities} />
          )}
        </>
      )}
    </div>
  )
}

export default App
