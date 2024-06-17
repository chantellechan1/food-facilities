import express, { Request, Response, Router } from "express"
import { container } from "tsyringe"
import SearchByApplicantNameController from "./controllers/SearchByApplicantNameController"
import { INVALID_REQUEST_BODY } from "../model/Errors"
import SearchByAddressController from "./controllers/SearchByAddressController"
import SearchByCoordinatesController from "./controllers/SearchByCoordinates"

// set up express router
const SearchRoutes: Router = express.Router()

// controllers for each route
const searchByApplicantNameController = container.resolve(
  SearchByApplicantNameController
)
const searchByAddressController = container.resolve(SearchByAddressController)
const searchByCoordinatesController = container.resolve(
  SearchByCoordinatesController
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

SearchRoutes.post("/address", (req: Request, res: Response) => {
  try {
    const results = searchByAddressController.handleRequest(req)
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

SearchRoutes.post("/coordinates", (req: Request, res: Response) => {
  try {
    const results = searchByCoordinatesController.handleRequest(req)
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
