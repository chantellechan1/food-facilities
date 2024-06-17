# Food Facilities Challenge

## Overview

This application provides an API through which food facility permits in San Franciso can be retrived through searching by applicant name, street name/address, or by latitude and longitude coordinates. It is deployed on Vercel at https://food-facilities.vercel.app. The original dataset for mobile food facility permits in San Francisco is available [here](https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat/data).

### Routes

#### GET /

A simple route to check if the API is working. Returns `Food Facilities API` as plaintext.

#### POST /search/applicantName

```
Request Body:
{
  applicantName: string
  status?: "APPROVED" | "REQUESTED" | "SUSPEND" | "EXPIRED"
}

Response Body:
FoodFacilityPermit[]
```

Search by the permit applicant's name and optionally the permit applicant's status. This search looks for each matches for the applicant's name, including case sensitivity. If `status` is not specified, permit applicants of any status matching the `applicantName` will be returned. The response body is an array of type `FoodFacilityPermit`, as defined [here](https://github.com/chantellechan1/food-facilities/blob/2f0b531a281c08bd5be9bdf0c30d12f57174bf3b/api/model/FoodFacilityPermit.ts#L1).

#### POST /search/address

```
Request Body:
{
  address: string
}
Response Body:
FoodFacilityPermit[]
```

Search by the permit applicant's address. This search matches partial string matches and is case insensitive. The response body is an array of type `FoodFacilityPermit`, as defined [here](https://github.com/chantellechan1/food-facilities/blob/2f0b531a281c08bd5be9bdf0c30d12f57174bf3b/api/model/FoodFacilityPermit.ts#L1).

#### POST /search/coordinates

```
Request Body:
{
  latitude: number
  longitude: number
  isOnlyReturnApprovedPermits?: boolean
}
Response Body:
FoodFacilityPermitWithDistance[]
```

Search by distance from a provided set of coordinates. Optionally, specify whether to include permit applicants who are not approved. If `isOnlyReturnApprovedPermits` is not supplied, by default only approved permit applicants will be included. The response body is an array of type `FoodFacilityPermitWithDistance`, as defined [here](https://github.com/chantellechan1/food-facilities/blob/2f0b531a281c08bd5be9bdf0c30d12f57174bf3b/api/model/FoodFacilityPermit.ts#L1). The responses are sorted by increasing distance from the provided coordinates set.

## Get Started

1. First, from the root directory of the project, install all dependencies.

```
npm install
```

2. Run the application locally.

```
npm run dev
```

3. Run the tests.

```
npm run test
```

4. After following steps from the [Vercel documentation for Express apps](https://vercel.com/guides/using-express-with-vercel), deploy.

```
vercel --prod
```

## Architecture choices

In this project, code is grouped by domain instead of responsiblility. This is to enable files for releated features to sit next to each other. Domains that are expected to be used across features are grouped by function from the root directory. Similarly, all search routes are grouped together under `<base_url>/search` using an Express `Router`. Note that instead of using the `/src` directory as is typical, the Express app source code is placed in `/api` as is default for Vercel deployed Express apps.

Instead of using the Google Maps API to determine the coordinate distance between two points, this project implements the [Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula) for distance between two points on a sphere, using [Earth's globally average radius](https://en.wikipedia.org/wiki/Earth_radius) of 6371 km. This is because running the Haversine distance calculation locally for each Food Facility Permit location from given target coordinates can be performed synchronously, without the need to launch an async external API call for each permit location. Quick experimentation showed calculation of Haversine distance for each row of the dataset completes in 3 - 7 milliseconds, whereas external APIs are expected to have a response time of 100 milliseconds - 1 second. Should the distance needed to travel between two coordinates (considering roads, ferries, walking paths, etc), instead of the as-the-crow-flies distance be considered, the [Google Maps Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/overview) should be used.

Tests in this project use the `Jest` testing framework, with `Babel` for transpiling typescript to javascript.

### Tradeoffs & Critque

The most glaring tradeoff is the decision to load the `Mobile_Food_Faciltiy_Permit` csv to memory using `csv-parse` instead of using a database. This was done for speed of implementation, though it should be noted that this approach is not scalable. It will immediately fail when write functionality is required and more than a single server is required, as the dataset will be out of sync. As Vercel deployment enables scaling to many instances of a serverless function, a central datastore will need to be implemented before deployment of write functionality.

In addition to the need for a database, this application would require additional tests at the service and route level before production deployment. Test scripts with expected request and response bodies should be set up before deployment to actual uses. Should the application be scaled to a large number of users, load balancers across a variable number of horizontally scaled servers should be used. Additionally, caches could be used to store the most frequently read searches. Should writes come into play, and should they need to be completed with variable urgency, a queue for write jobs could be implemented.

With more time, I would implement extension of this project as detailed in the [Potential next steps](#potential-next-steps) section.

## Potential next steps

1. Implement authentication to secure the API.
2. Implement centralized datastore.
3. Implement pagination of search results.
4. Implement more flexible retrieval of results by allowing combinations of filters on the dataset.
5. Implement flexible distance type, allowing either as-the-crow-files or actual distance to travel.
6. Implement frontend!
