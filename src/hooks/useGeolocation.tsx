import { useState } from 'react'
import { TCity } from '../types'

const url = 'https://geocoding-api.open-meteo.com/v1/'

export const useGeolocation = (city: string) => {
  const [cities, setCities] = useState<TCity[]>([])
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCitiesData = async () => {
    setIsPending(true)

    try {
      const response = await fetch(url + 'search?name=' + city)
      ;('')
      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const json = await response.json()

      setIsPending(false)

      if (!json.results) {
        setError('No results')
        return setCities([])
      }

      setCities(json.results)
      setError(null)
    } catch (error) {
      setError(`${error} Could not Fetch Data `)
      setIsPending(false)
    }
  }

  return { cities, isPending, error, fetchCitiesData }
}
