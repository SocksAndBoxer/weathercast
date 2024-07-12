import { City } from '../types'

type CitiesProps = {
  handleCitySelection: (city: City) => void
  cities: City[]
}

const Cities = ({ cities, handleCitySelection }: CitiesProps) => {
  return (
    <section>
      <h2>Select your city</h2>
      {cities.map(city => {
        console.log(city)
        return (
          <div onClick={() => handleCitySelection(city)} key={city.id}>
            {city.name} - {city.admin1} {city.admin2}
          </div>
        )
      })}
    </section>
  )
}

export default Cities
