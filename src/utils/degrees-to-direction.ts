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

  // Ensure it's within 0-7
  console.log('dire', convertedDegrees, directions[convertedDegrees % 16])

  return directions[convertedDegrees % 16]
}
