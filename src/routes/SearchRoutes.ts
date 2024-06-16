import express, { Express, Request, Response, Router } from "express"
import { container } from "tsyringe"
import SearchByApplicantNameController from "../controllers/SearchByApplicantNameController"
import { INVALID_REQUEST_BODY } from "../model/Errors"

// set up express router
const SearchRoutes: Router = express.Router()

// controllers for each route
const searchByApplicantNameController = container.resolve(
  SearchByApplicantNameController
)

// routes
SearchRoutes.post("/applicantName", (req: Request, res: Response) => {
  try {
    const results = searchByApplicantNameController.handleRequest(req)
    res.json(results)
  } catch (e: any) {
    if (e.message === INVALID_REQUEST_BODY) {
      res.status(400).send(e.message)
      return
    }

    console.error(e)
    res.status(500).send("Internal Server Error")
  }
})

export default SearchRoutes
