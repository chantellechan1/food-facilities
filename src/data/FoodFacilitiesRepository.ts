import { parse } from "csv-parse/sync"
import { readFileSync } from "fs"
import path from "path"
import { singleton } from "tsyringe"
import {
  FacilityStatus,
  FacilityType,
  FoodFacilityPermit,
} from "../model/FoodFacilityPermit"

@singleton()
export default class FoodFacilitiesRepository {
  foodFacilityPermits: FoodFacilityPermit[]

  constructor() {
    this.foodFacilityPermits = this.readCSVToFoodFacilityPermits()
  }

  readCSVToFoodFacilityPermits(): FoodFacilityPermit[] {
    const csvPath = path.resolve(__dirname, "Mobile_Food_Facility_Permit.csv")
    const csvContent = readFileSync(csvPath, { encoding: "utf-8" })
    const csvHeaders = [
      "locationid",
      "Applicant",
      "FacilityType",
      "cnn",
      "LocationDescription",
      "Address",
      "blocklot",
      "block",
      "lot",
      "permit",
      "Status",
      "FoodItems",
      "X",
      "Y",
      "Latitude",
      "Longitude",
      "Schedule",
      "dayshours",
      "NOISent",
      "Approved",
      "Received",
      "PriorPermit",
      "ExpirationDate",
      "Location",
      "Fire Prevention Districts",
      "Police Districts",
      "Supervisor Districts",
      "Zip Codes",
      "Neighborhoods (old)",
    ]

    const records = parse(csvContent, {
      columns: csvHeaders,
      delimiter: ",",
      fromLine: 2,
    })

    const foodFacilityPermits: FoodFacilityPermit[] = records.map(
      (record: Record<string, string>) =>
        this.transformCSVRecordToFoodFacilityPermit(record)
    )

    return foodFacilityPermits
  }

  transformCSVRecordToFoodFacilityPermit(
    record: Record<string, string>
  ): FoodFacilityPermit {
    return {
      locationId: Number(record.locationid),
      applicant: record.Applicant,

      // if the facility type exists in the enum, use it, otherwise use undefined
      facilityType:
        record.FacilitiesType &&
        Object.values(FacilityType).includes(
          record.FacilitiesType as FacilityType
        )
          ? (record.FacilitiesType as FacilityType)
          : undefined,
      cnn: Number(record.cnn),
      locationDescription: record.LocationDescription,
      address: record.Address,
      blocklot: record.blocklot,
      block: record.block ? Number(record.block) : undefined,
      lot: record.lot,
      permit: record.permit,

      // if the status exists in the enum, use it, otherwise use FacilityStatus.Requested as the most harmless default
      status:
        record.Status &&
        Object.values(FacilityStatus).includes(record.Status as FacilityStatus)
          ? (record.Status as FacilityStatus)
          : FacilityStatus.Requested,
      foodItems: record.FoodItems,
      x: record.X ? Number(record.X) : undefined,
      y: record.Y ? Number(record.Y) : undefined,
      latitude: Number(record.Latitude),
      longitude: Number(record.Longitude),
      schedule: record.Schedule,
      dayshours: record.dayshours,
      NOISent: record.NOISent,
      approved: record.Approved,
      received: record.Received,
      priorPermit: Number(record.PriorPermit),
      expirationDate: record.ExpirationDate,
      location: record.Location,
      firePreventionDistricts: record["Fire Prevention Districts"]
        ? Number(record["Fire Prevention Districts"])
        : undefined,
      policeDistricts: record["Police Districts"]
        ? Number(record["Police Districts"])
        : undefined,
      supervisorDistricts: record["Supervisor Districts"]
        ? Number(record["Supervisor Districts"])
        : undefined,
      zipCodes: record["Zip Codes"] ? Number(record["Zip Codes"]) : undefined,
      neighborhoodsOld: record["Neighborhoods (old)"]
        ? Number(record["Neighborhoods (old)"])
        : undefined,
    }
  }
}
