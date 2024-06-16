import { container, injectable } from "tsyringe"
import { FacilityStatus, FoodFacilityPermit } from "../model/FoodFacilityPermit"
import FoodFacilitiesRepository from "../data/FoodFacilitiesRepository"

@injectable()
export default class SearchService {
  foodFacilityPermits: FoodFacilityPermit[]

  constructor() {
    const foodFacilitiesRepository = container.resolve(FoodFacilitiesRepository)
    this.foodFacilityPermits = foodFacilitiesRepository.foodFacilityPermits // TODO: load data from file
  }

  getAllFoodFacilityPermits(): FoodFacilityPermit[] {
    return this.foodFacilityPermits
  }

  searchByApplicantName(
    applicantName: string,
    status?: FacilityStatus
  ): FoodFacilityPermit[] {
    return this.foodFacilityPermits.filter((permit) => {
      // NOTE: opportunity for extension here with fuzzy matching/case insensitivity/partial matching, etc
      if (permit.applicant !== applicantName) {
        return false
      }

      if (typeof status === "undefined") {
        return true
      }

      return permit.status === status
    })
  }
}
