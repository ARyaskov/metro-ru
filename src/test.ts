import { City, getClosestStations } from "./metro.js"

async function main() {
  // console.log("Hello World!")
  // console.log(getClosestMoscowStation(55.640918, 37.754337))
  console.log(getClosestStations(City.Moscow, 55.640918, 37.754337, 3))

  // console.log(getClosestStations(City.Ekaterinburg, 56.819054, 60.607718, 3))
  // console.log(getStationNames(City.Ekaterinburg).length)
  // console.log(getClosestStations(City.SaintPetersburg, 59.935641, 30.325786, 2))
  // console.log(getClosestStations(City.Kazan, 55.782795, 49.129366, 2))
  // console.log(getClosestStations(City.Moscow, 55.640918, 37.754337, 2))
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
