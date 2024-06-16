import express, { Express, Request, Response, Router } from "express"
import { container } from "tsyringe"
import SearchByApplicantNameController from "../controllers/SearchByApplicantNameController"

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
    res.status(400).send(e.message)
  }
})

export default SearchRoutes
