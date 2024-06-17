/**
 * This type denotes a food facility permit. Values taken from Mobile_Food_Facility_Permit.csv
 * Fields are marked as possibily undefined following columns that have a non-zero count of empty rows,
 * as shown here: https://docs.google.com/spreadsheets/d/1XgU9tu7teYOXiLBIgLd32HBuM4kKAEuZw-FzcLyey_A
 */
export type FoodFacilityPermit = {
  locationId: number
  applicant: string
  facilityType: FacilityType | undefined
  cnn: number // CNN of street segment or intersection location
  locationDescription: string | undefined
  address: string
  blocklot: number | string // either a number of the stirng "/Lot"
  block: number | undefined
  lot: string | undefined
  permit: string
  status: FacilityStatus
  foodItems: string | undefined // short description of food items
  x: number | undefined //  CA State Plane III
  y: number | undefined //  CA State Plane III
  latitude: number
  longitude: number
  schedule: string // url
  dayshours: string | undefined
  NOISent: string | undefined // date string or undefined
  approved: string | undefined // date string or undefined
  received: string // date string or undefined
  priorPermit: number
  expirationDate: string | undefined // date string or undefined
  location: string // coordinate pair string in the format (latitude, longitude)
  firePreventionDistricts: number | undefined
  policeDistricts: number | undefined
  supervisorDistricts: number | undefined
  zipCodes: number | undefined
  neighborhoodsOld: number | undefined
}

type Distance = {
  distance: number // distance in km from a given point
}

export type FoodFacilityPermitWithDistance = FoodFacilityPermit & Distance

export enum FacilityType {
  Truck = "Truck",
  PushCart = "Push Cart",
}

export enum FacilityStatus {
  Approved = "APPROVED",
  Requested = "REQUESTED",
  Suspend = "SUSPEND",
  Expired = "EXPIRED",
}
