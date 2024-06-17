## TODOs

- deploy with heroku or something
- frontend UI

## extension

- fuzzy search applicant name and street name
- use a GIS library instead of haversine formula and calculating distance for each value of the FoodFacilities array
- use the stream version of csv-parse because the current state of the project only works if the contents of the csv fit in memory
- handle (0, 0) for lat long, there are a few of those with 0,0 coordinates
- choose a DB instead of just loading the csv into memory
  - sqllite for DB?
