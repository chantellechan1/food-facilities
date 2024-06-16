import { Request } from "express"
import { FoodFacilityPermit } from "../../model/FoodFacilityPermit"
import SearchService from "../services/SearchService"
import { container, injectable } from "tsyringe"
import { INVALID_REQUEST_BODY } from "../../model/Errors"

type SearchByCoordinatesRequestBody = {
  latitude: number
  longitude: number
  isOnlyReturnApprovedPermits?: boolean
}

@injectable()
export default class SearchByCoordinatesController {
  private searchService: SearchService

  constructor() {
    this.searchService = container.resolve(SearchService)
  }

  verifyRequestBody(x: any): x is SearchByCoordinatesRequestBody {
    if (
      typeof x.isOnlyReturnApprovedPermits !== "undefined" &&
      typeof x.isOnlyReturnApprovedPermits !== "boolean"
    ) {
      return false
    }

    return typeof x.latitude === "number" && typeof x.longitude === "number"
  }

  handleRequest(request: Request): FoodFacilityPermit[] {
    // verify request body and throw error if request is malformed
    const body: unknown = request.body
    if (!this.verifyRequestBody(body)) {
      throw new Error(INVALID_REQUEST_BODY)
    }

    // unless otherwise specified, only return approved permits
    const isOnlyReturnApprovedPermits =
      typeof body.isOnlyReturnApprovedPermits === "boolean"
        ? body.isOnlyReturnApprovedPermits
        : true

    const permits = this.searchService.searchByCoordinates(
      body.latitude,
      body.longitude,
      isOnlyReturnApprovedPermits
    )

    return permits
  }
}
