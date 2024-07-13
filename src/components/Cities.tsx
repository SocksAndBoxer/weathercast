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
  if (error) {
    return <p>{error}</p>
  }
  return (
    <section>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Select your city</h2>
          {cities.map(city => (
            <div onClick={() => handleCitySelection(city)} key={city.id}>
              {city.name} - {city.admin1} {city.admin2}
            </div>
          ))}
        </>
      )}
    </section>
  )
}

export default Cities
