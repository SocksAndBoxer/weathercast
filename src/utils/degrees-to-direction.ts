const directions = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
] as const

export const degreesToDirection = (degrees: number) => {
  // Split into the 8 directions
  let convertedDegrees = Math.floor(degrees / 22.5 + 0.5)

  return directions[convertedDegrees % 16]
}
