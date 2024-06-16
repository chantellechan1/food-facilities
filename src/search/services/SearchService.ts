import { container, injectable } from "tsyringe"
import {
  FacilityStatus,
  FoodFacilityPermit,
} from "../../model/FoodFacilityPermit"
import FoodFacilitiesRepository from "../../data/FoodFacilitiesRepository"
import haversineDistance from "../util/Haversine"

@injectable()
export default class SearchService {
  foodFacilityPermits: FoodFacilityPermit[]

  constructor() {
    const foodFacilitiesRepository = container.resolve(FoodFacilitiesRepository)
    this.foodFacilityPermits = foodFacilitiesRepository.foodFacilityPermits
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

  searchByAddress(partialAddress: string) {
    return this.foodFacilityPermits.filter((permit) => {
      return permit.address.toLowerCase().includes(partialAddress.toLowerCase())
    })
  }

  searchByCoordinates(
    latitude: number,
    longitude: number,
    isOnlyReturnApprovedPermits: boolean
  ) {
    // optionally filter out non-approved permits
    const permits = isOnlyReturnApprovedPermits
      ? this.foodFacilityPermits.filter(
          (permit) => permit.status === FacilityStatus.Approved
        )
      : this.foodFacilityPermits

    // calculate distance from each permit to the given coordinates
    const permitsWithDistance: Array<
      FoodFacilityPermit & { distance: number }
    > = permits.map((permit) => ({
      ...permit,
      distance: haversineDistance(
        { latitude, longitude },
        { latitude: permit.latitude, longitude: permit.longitude }
      ),
    }))

    // sort ascending by distance
    permitsWithDistance.sort((a, b) => a.distance - b.distance)

    return permitsWithDistance.slice(0, 5)
  }
}
