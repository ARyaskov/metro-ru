import { getClosestMoscowStation, getClosestMoscowStations, getMoscowStationNames } from "./moscow.js"
import { getClosestEkaterinburgStation, getClosestEkaterinburgStations, getEkaterinburgStationNames } from "./ekaterinburg.js"
import { getClosestStPetersburgStation, getClosestStPetersburgStations, getStPetersburgStationNames } from "./stpetersburg.js"
import { getClosestKazanStation, getClosestKazanStations, getKazanStationNames } from "./kazan.js"
import { MetroStation } from "./util"

export enum City {
  Moscow = "Moscow",
  SaintPetersburg = "SaintPetersburg",
  NizhnyNovgorod = "NizhnyNovgorod",
  Kazan = "Kazan",
  Novosibirsk = "Novosibirsk",
  Ekaterinburg = "Ekaterinburg",
  Samara = "Samara"
}

export function getClosestStation(city: City, lat: number, lon: number): [MetroStation, number] | null {
  switch (city) {
    case City.Moscow:
      return getClosestMoscowStation(lat, lon)
    case City.SaintPetersburg:
      return getClosestStPetersburgStation(lat, lon)
    case City.Kazan:
      return getClosestKazanStation(lat, lon)
    case City.Ekaterinburg:
      return getClosestEkaterinburgStation(lat, lon)
    default:
      return null
  }
}

export function getClosestStations(city: City, lat: number, lon: number, n: number): [MetroStation, number][] | null {
  switch (city) {
    case City.Moscow:
      return getClosestMoscowStations(lat, lon, n)
    case City.SaintPetersburg:
      return getClosestStPetersburgStations(lat, lon, n)
    case City.Kazan:
      return getClosestKazanStations(lat, lon, n)
    case City.Ekaterinburg:
      return getClosestEkaterinburgStations(lat, lon, n)
    default:
      return null
  }
}

export function getStationNames(city: City): string[] {
  switch (city) {
    case City.Moscow:
      return getMoscowStationNames()
    case City.SaintPetersburg:
      return getStPetersburgStationNames()
    case City.Kazan:
      return getKazanStationNames()
    case City.Ekaterinburg:
      return getEkaterinburgStationNames()
    default:
      return []
  }
}
