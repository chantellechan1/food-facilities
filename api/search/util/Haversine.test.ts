import calculateHaversineDistance from "./Haversine"

// expected values confirmed with https://www.vcalc.com/wiki/vcalc/haversine-distance

test("Havesine function base case", () => {
  const point1 = { latitude: 37.780918, longitude: -122.392417 }
  const point2 = { latitude: 49.28431846907374, longitude: -122.82946350104375 }
  const calculated = calculateHaversineDistance(point1, point2)

  const rounded = Number((Math.round(calculated * 10) / 10).toFixed(1))

  const expected = 1279.5

  expect(rounded).toBe(expected)
})

test("Havesine function zero distance", () => {
  const point1 = { latitude: 37.780918, longitude: -122.392417 }
  const point2 = { latitude: 37.780918, longitude: -122.392417 }
  const calculated = calculateHaversineDistance(point1, point2)

  const rounded = Number((Math.round(calculated * 10) / 10).toFixed(1))

  const expected = 0.0

  expect(rounded).toBe(expected)
})

test("Havesine function - testing (0, 0)", () => {
  const point1 = { latitude: 49.28431846907374, longitude: -122.82946350104375 }
  const point2 = { latitude: 0.0, longitude: 0.0 }
  const calculated = calculateHaversineDistance(point1, point2)

  const rounded = Number((Math.round(calculated * 10) / 10).toFixed(1))

  const expected = 12310.4

  expect(rounded).toBe(expected)
})
