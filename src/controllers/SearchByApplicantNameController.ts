import { Request } from "express"
import { FacilityStatus, FoodFacilityPermit } from "../model/FoodFacilityPermit"
import SearchService from "../services/SearchService"
import { container, injectable } from "tsyringe"
import { INVALID_REQUEST_BODY } from "../model/Errors"

type SearchByApplicantNameRequestBody = {
  applicantName: string
  status: FacilityStatus | undefined
}

@injectable()
export default class SearchByApplicantNameController {
  private searchService: SearchService

  constructor() {
    this.searchService = container.resolve(SearchService)
  }

  verifyRequestBody(x: any): x is SearchByApplicantNameRequestBody {
    if (typeof x.applicantName !== "string") {
      return false
    }

    if (typeof x.status === "undefined") {
      return true
    }

    if (typeof x.status !== "string") {
      return false
    }

    if (!Object.values(FacilityStatus).includes(x.status)) {
      return false
    }

    return true
  }

  handleRequest(request: Request): FoodFacilityPermit[] {
    // verify request body and throw error if request is malformed
    const body: unknown = request.body
    if (!this.verifyRequestBody(body)) {
      throw new Error(INVALID_REQUEST_BODY)
    }

    const permits = this.searchService.searchByApplicantName(
      body.applicantName,
      body.status
    )
    return permits
  }
}
