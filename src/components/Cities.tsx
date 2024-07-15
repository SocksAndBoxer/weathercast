import { TCity } from '../types'

type CitiesProps = {
  handleCitySelection: (city: TCity) => void
  cities: TCity[]
  error: string | null
  isPending: boolean
}

const Cities = ({
  cities,
  handleCitySelection,
  error,
  isPending,
}: CitiesProps) => {
  if (error || cities.length === 0) {
    return <p>{error}</p>
  }

  return (
    <section>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className='font-bold text-lg mb-4'>Select your city</h2>
          <ul>
            {cities.map(city => (
              <li
                className='cursor-pointer mb-2'
                onClick={() => handleCitySelection(city)}
                key={city.id}
              >
                {city.name} - {city.admin1} {city.admin2}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default Cities
