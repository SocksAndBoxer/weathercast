import { SetStateAction, useEffect, useState } from 'react'
import './App.css'
import { useGeolocation } from './hooks/useGeolocation'
import { TCity, THourly } from './types'
import Cities from './components/Cities'
import { useWeathercast } from './hooks/useWeathercast'
import DailyForecast from './components/DailyForecast'
import HourlyForecast from './components/HourlyForecast'
import { useOutsideClick } from './hooks/useOutsideClick'

function App() {
  const [city, setCity] = useState('')
  const [toggledTemp, setToggledTemp] = useState<'celsius' | 'fahrenheit'>(
    'celsius'
  )
  const [selectedCity, setSelectedCity] = useState<TCity | null>(null)
  const [hourlyInfos, setHourlyInfos] = useState<THourly[] | null>(null)
  const [toggleSearch, setToggleSearch] = useState(false)
  const ref = useOutsideClick(() => {
    setToggleSearch(false)
  })
  const { cities, isPending, error, fetchCitiesData } = useGeolocation(city)
  const { forecast, isPending: isWeathercastPending } = useWeathercast(
    selectedCity,
    toggledTemp
  )

  useEffect(() => {
    forecast && setHourlyInfos(forecast[0].hourly)
  }, [forecast])

  const handleInputChange = (e: {
    target: { value: SetStateAction<string> }
  }) => {
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
    <div className='min-w-[1200px]'>
      <h1 className='mb-6 text-4xl'>Weather Forecast in your city</h1>
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
          <div
            ref={ref}
            className='absolute bg-gray-700 px-8 py-4 rounded top-14 left-[280px] text-white'
          >
            <Cities
              handleCitySelection={handleCitySelection}
              isPending={isPending}
              error={error}
              cities={cities}
            />
          </div>
        )}
        <button
          className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          type='submit'
        >
          Get Weather
        </button>
        <button
          className='min-w-[230px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
          onClick={handleTempButton}
        >
          Temperature : {toggledTemp}
        </button>
      </form>
      <section className='flex flex-col gap-8'>
        {forecast && !isWeathercastPending && (
          <>
            <h2 className='text-xl'>{selectedCity?.name}</h2>
            <section className='flex justify-center gap-6'>
              {forecast.map(day => (
                <DailyForecast
                  selected={day.hourly === hourlyInfos}
                  day={day}
                  key={day.date?.getDay()}
                  handleHourlyForecast={handleHourlyForecast}
                />
              ))}
            </section>
          </>
        )}
        {hourlyInfos && (
          <section className='flex flex-wrap justify-center gap-4'>
            {hourlyInfos.map(hours => (
              <HourlyForecast key={hours.hour.getHours()} hours={hours} />
            ))}
          </section>
        )}
      </section>
    </div>
  )
}

export default App
