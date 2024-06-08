import {
  getClosestEkaterinburgStations,
  getClosestMoscowStation,
  getClosestMoscowStations,
  getClosestStation,
  getStationNames,
} from "./index.js"
import { City, getClosestStations } from "./metro.js"

async function main() {
  console.log("Hello World!")
  // console.log(getClosestMoscowStation(55.640918, 37.754337))
  // console.log(getClosestMoscowStations(55.640918, 37.754337, 3))

  // console.log(getClosestEkaterinburgStations(56.819054, 60.607718, 3))
  // console.log(getStationNames(City.Ekaterinburg).length)
  console.log(getClosestStations(City.Moscow, 55.640918, 37.754337, 2))
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
