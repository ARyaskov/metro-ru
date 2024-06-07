import { getClosestMoscowStation, getMoscowStationNames } from "./moscow.js"
import {
  getClosestEkaterinburgStation,
  getEkaterinburgStationNames,
} from "./ekaterinburg.js"

export enum City {
  Moscow = "Moscow",
  SaintPetersburg = "Saint Petersburg",
  NizhnyNovgorod = "Nizhny Novgorod",
  Kazan = "Kazan",
  Novosibirsk = "Novosibirsk",
  Ekaterinburg = "Ekaterinburg",
  Samara = "Samara",
}

export interface MetroStation {
  name: string
  nameTranslit: string
  lon: number
  lat: number
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
