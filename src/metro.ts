import {
  getClosestMoscowStation,
  getClosestMoscowStations,
  getMoscowStationNames,
} from "./moscow.js"
import {
  getClosestEkaterinburgStation,
  getClosestEkaterinburgStations,
  getEkaterinburgStationNames,
} from "./ekaterinburg.js"

export enum City {
  Moscow = "Moscow",
  SaintPetersburg = "SaintPetersburg",
  NizhnyNovgorod = "NizhnyNovgorod",
  Kazan = "Kazan",
  Novosibirsk = "Novosibirsk",
  Ekaterinburg = "Ekaterinburg",
  Samara = "Samara",
}

export interface MetroStation {
  name: string
  nameTranslit: string
  lat: number
  lon: number
  lineColor: string
  lineName: string
  lineNameTranslit: string
  order: number
}

export function getClosestStation(
  city: City,
  lat: number,
  lon: number,
): [MetroStation, number] | null {
  switch (city) {
    case City.Moscow:
      return getClosestMoscowStation(lat, lon)
    case City.Ekaterinburg:
      return getClosestEkaterinburgStation(lat, lon)
    default:
      return null
  }
}

export function getClosestStations(
  city: City,
  lat: number,
  lon: number,
  n: number,
): [MetroStation, number][] | null {
  switch (city) {
    case City.Moscow:
      return getClosestMoscowStations(lat, lon, n)
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
    case City.Ekaterinburg:
      return getEkaterinburgStationNames()
    default:
      return []
  }
}
