import "reflect-metadata"
import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import SearchRoutes from "./routes/SearchRoutes"

dotenv.config()

const app: Express = express()
app.use(express.json())
const port = process.env.PORT || 3000

app.get("/", (req: Request, res: Response) => {
  res.send("Food Facilities API")
})

// register search routes
app.use("/search", SearchRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
