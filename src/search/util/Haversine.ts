export type Point = {
  latitude: number
  longitude: number
}

const EARTH_RADIUS = 6371 // Earth's average radius in km

/**
 * The Haversine formula determines distance between two points on a sphere given their longitudes and latitudes.
 * See https://en.wikipedia.org/wiki/Haversine_formula for more on how this works.
 * The following is a utility function that implements the Haversine formula to calculate the distance between two points.
 * @param point1 - {latitude: number, longitude: number}, values are expected in degrees
 * @param point2 - {latitude: number, longitude: number}, values are expected in degrees
 * @returns number - distance between the two points in km
 */
export default function haversineDistance(
  point1: Point,
  point2: Point
): number {
  // convert degrees to radians
  const lat1 = toRadians(point1.latitude)
  const lat2 = toRadians(point2.latitude)

  const long1 = toRadians(point1.longitude)
  const long2 = toRadians(point2.longitude)

  const haversineDistance =
    2 *
    EARTH_RADIUS *
    Math.asin(
      Math.sqrt(
        (1 -
          Math.cos(lat2 - lat1) +
          Math.cos(lat1) *
            Math.cos(point2.latitude) *
            (1 - Math.cos(long2 - long1))) /
          2
      )
    )

  return haversineDistance
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

// test
// TODO proper tests
console.log(
  haversineDistance(
    { latitude: 37.780918, longitude: -122.392417 },
    { latitude: 49.28431846907374, longitude: -122.82946350104375 }
  )
) // expect 1279.5 km
