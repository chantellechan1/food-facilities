import { Request } from "express"
import { FoodFacilityPermit } from "../../model/FoodFacilityPermit"
import SearchService from "../services/SearchService"
import { container, injectable } from "tsyringe"
import { INVALID_REQUEST_BODY } from "../../model/Errors"

type SearchByAddressRequestBody = {
  address: string
}

@injectable()
export default class SearchByAddressController {
  private searchService: SearchService

  constructor() {
    this.searchService = container.resolve(SearchService)
  }

  verifyRequestBody(x: any): x is SearchByAddressRequestBody {
    return typeof x.address === "string"
  }

  handleRequest(request: Request): FoodFacilityPermit[] {
    // verify request body and throw error if request is malformed
    const body: unknown = request.body
    if (!this.verifyRequestBody(body)) {
      throw new Error(INVALID_REQUEST_BODY)
    }

    const permits = this.searchService.searchByAddress(body.address)
    return permits
  }
}
