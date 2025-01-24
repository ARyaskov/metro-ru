// @ts-ignore
import moscowMetroData from "./data/moscow.json"
import { findClosestStations, getStationNames, getStationNamesByLineColor, getStationsByLineColor, MetroStation } from "./util.js"

export enum LineColorsMnemonicRu {
  Krasnaya = "E42313",
  Zelenaya = "4FB04F",
  Sinyaya = "0072BA",
  Golubaya = "1EBCEF",
  Korichnevaya = "915133",
  Koltsevaya = "915133",
  Oranzhevaya = "F07E24",
  Fioletovaya = "943E90",
  Zheltaya = "FFCD1C",
  Seraya = "ADACAC",
  Salatovaya = "BED12C"
}

export function getClosestMoscowStation(lat: number, lon: number): [MetroStation, number] {
  return findClosestStations(moscowMetroData, lat, lon, 1)[0]
}

export function getClosestMoscowStations(lat: number, lon: number, n: number): [MetroStation, number][] {
  return findClosestStations(moscowMetroData, lat, lon, n)
}

export function getMoscowStationNames(): string[] {
  return getStationNames(moscowMetroData)
}

export function getMoscowStationsByLineColor(line: LineColorsMnemonicRu): MetroStation[] {
  return getStationsByLineColor(moscowMetroData, line)
}

export function getMoscowStationNamesByLineColor(line: LineColorsMnemonicRu): string[] {
  return getStationNamesByLineColor(moscowMetroData, line)
}
