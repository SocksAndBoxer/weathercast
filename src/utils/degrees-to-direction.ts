const directions = [
  'north',
  'northeast',
  'east',
  'southeast',
  'south',
  'southwest',
  'west',
  'northwest',
] as const

export const degreesToDirection = (degrees: number) => {
  // Split into the 8 directions
  let convertedDegrees = Math.floor(degrees / 22.5 + 0.5)

  // Ensure it's within 0-7
  console.log(convertedDegrees)

  return directions[convertedDegrees % 16]
}
