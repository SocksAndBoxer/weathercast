import { SetStateAction, useState } from 'react'
import './App.css'
import { useGeolocation } from './hooks/useGeolocation'
import { TCity, THourly } from './types'
import Cities from './components/Cities'
import { useWeathercast } from './hooks/useWeathercast'
import DailyForecast from './components/DailyForecast'

function App() {
  const [city, setCity] = useState('')
  const [toggledTemp, setToggledTemp] = useState<'celsius' | 'fahrenheit'>(
    'celsius'
  )
  const [selectedCity, setSelectedCity] = useState<TCity | null>(null)
  const [hourlyInfos, setHourlyInfos] = useState<THourly[] | null>(null)
  const [toggleSearch, setToggleSearch] = useState(false)
  const { cities, isPending, error, fetchCitiesData } = useGeolocation(city)
  const { forecast, isPending: isWeathercastPending } = useWeathercast(
    selectedCity,
    toggledTemp
  )

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setSelectedCity(null)
    setToggleSearch(false)
    setCity(e.target.value)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setToggleSearch(true)
    fetchCitiesData()
  }

  const handleCitySelection = (city: TCity) => {
    setSelectedCity(city)
    setToggleSearch(false)
    setCity(city.name)
  }

  const handleHourlyForecast = (hourly: THourly[]) => {
    setHourlyInfos(hourly)
  }

  const handleTempButton = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setToggledTemp((oldTemp: string) =>
      oldTemp === 'celsius' ? 'fahrenheit' : 'celsius'
    )
    setToggleSearch(false)
  }

  return (
    <div>
      <h1 className='mb-3'>Weather Forecast in your city</h1>
      <form
        className='relative flex flex-row justify-center gap-4 mb-8'
        onSubmit={handleSubmit}
      >
        <input
          className='shadow appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="username'
          type='text'
          placeholder='Enter city name'
          value={city}
          onChange={handleInputChange}
        />
        {toggleSearch && (
          <div className='absolute bg-gray-700 px-8 py-4 rounded top-14 left-8'>
            <Cities
              handleCitySelection={handleCitySelection}
              isPending={isPending}
              error={error}
              cities={cities}
            />
          </div>
        )}
        <button type='submit'>Get Weather</button>
        <button onClick={handleTempButton}>Temperature : {toggledTemp}</button>
      </form>
      <section className='flex flex-col gap-8'>
        {forecast && !isWeathercastPending && (
          <>
            <h2 className='text-xl'>{selectedCity?.name}</h2>
            <section className='flex gap-2'>
              {forecast.map(day => (
                <DailyForecast
                  day={day}
                  handleHourlyForecast={handleHourlyForecast}
                />
              ))}
            </section>
          </>
        )}
        {hourlyInfos && (
          <section className='flex flex-wrap justify-center gap-2'>
            {hourlyInfos.map(hours => (
              <div>
                <p>{hours.hour.getHours()}h</p>
                <p>{Math.round(hours.temperature)}°</p>
              </div>
            ))}
          </section>
        )}
      </section>
    </div>
  )
}

export default App
