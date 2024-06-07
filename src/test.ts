import {
  getClosestMoscowStation,
  getClosestMoscowStations,
  getStationNames,
} from "./index.js"
import { City } from "./metro.js"

async function main() {
  console.log("Hello World!")
  console.log(getClosestMoscowStation(55.640918, 37.754337))
  console.log(getClosestMoscowStations(55.640918, 37.754337, 3))
  console.log(getStationNames(City.Moscow).length)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
