import "reflect-metadata"
import { container } from "tsyringe"
import SearchService from "./SearchService"
import { FacilityStatus } from "../../model/FoodFacilityPermit"

const searchService = container.resolve(SearchService)

// Testing searchByApplicantName
// =============================
test("searchByApplicantName - Street Meet", () => {
  const permits = searchService.searchByApplicantName("Street Meet")

  const expectedLocationIDs = [1591779, 1591780, 1591781, 1447794]

  expect(permits.length).toBe(4)
  for (const permit of permits) {
    expect(expectedLocationIDs.includes(permit.locationId)).toBe(true)
  }
})

test("searchByApplicantName - Street Meet where status is REQUESTED", () => {
  const permits = searchService.searchByApplicantName(
    "Street Meet",
    FacilityStatus.Requested
  )
  const expectedLocationID = 1447794

  expect(permits.length).toBe(1)
  expect(permits[0].locationId).toBe(expectedLocationID)
})

test("searchByApplicantName - name with no matches", () => {
  const permits = searchService.searchByApplicantName("FOOBAR")
  expect(permits.length).toBe(0)
})

// Testing searchByAddress
// ========================
test("searchByAddress - california st", () => {
  const permits = searchService.searchByAddress("california st")
  expect(permits.length).toBe(17)
})

test("searchByAddress - 50 california st", () => {
  const permits = searchService.searchByAddress("50 california st")
  const expectedLocationIDs = [1089427, 1336742]
  expect(permits.length).toBe(2)
  for (const permit of permits) {
    expect(expectedLocationIDs.includes(permit.locationId)).toBe(true)
  }
})

// Testing searchByCoordinates
// ===========================
test("searchByCoordinates - return only approved", () => {
  const permits = searchService.searchByCoordinates(
    49.28431846907374,
    -122.82946350104375,
    true
  )
  const expectedLocationIDs = [1569152, 1587563, 1577115, 1589649, 1585452]

  expect(permits.length).toBe(5)
  for (let i = 0; i < 5; i++) {
    expect(expectedLocationIDs[i]).toBe(permits[i].locationId)
  }
})

test("searchByCoordinates - return any status", () => {
  const permits = searchService.searchByCoordinates(
    49.28431846907374,
    -122.82946350104375,
    false
  )
  const expectedLocationIDs = [1344202, 1569152, 1587563, 1577115, 1589649]

  expect(permits.length).toBe(5)
  for (let i = 0; i < 5; i++) {
    expect(expectedLocationIDs[i]).toBe(permits[i].locationId)
  }
})
