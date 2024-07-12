const url = 'https://geocoding-api.open-meteo.com/v1/search?name='

import { useState } from 'react'
import { City } from '../types'

export const useGeolocation = (city: string) => {
  const [cities, setCities] = useState<City[]>([])
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCitiesData = async () => {
    setIsPending(true)
    try {
      const response = await fetch(url + city)

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const json = await response.json()

      setIsPending(false)
      setCities(json.results)
      setError(null)
    } catch (error) {
      setError(`${error} Could not Fetch Data `)
      setIsPending(false)
    }
  }

  return { cities, isPending, error, fetchCitiesData }
}
