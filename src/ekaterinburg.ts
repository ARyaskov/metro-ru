// @ts-ignore
import ekaterinburgMetroData from "./data/ekaterinburg.json"
import { findClosestStations, getStationNames, MetroStation } from "./util.js"

export function getClosestEkaterinburgStation(lat: number, lon: number): [MetroStation, number] {
  return findClosestStations(ekaterinburgMetroData, lat, lon, 1)[0]
}

export function getClosestEkaterinburgStations(lat: number, lon: number, n: number): [MetroStation, number][] {
  return findClosestStations(ekaterinburgMetroData, lat, lon, n)
}

export function getEkaterinburgStationNames(): string[] {
  return getStationNames(ekaterinburgMetroData)
}
