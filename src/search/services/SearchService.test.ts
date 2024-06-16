import "reflect-metadata"
import { container } from "tsyringe"
import SearchService from "./SearchService"

const searchService = container.resolve(SearchService)

test("adds 1 + 2 to equal 3", () => {
  expect(3).toBe(3)
})

test("searchByApplicantName - Street Meet", () => {
  const permits = searchService.searchByApplicantName("Street Meet")
  expect(permits.length).toBe(4)
})
