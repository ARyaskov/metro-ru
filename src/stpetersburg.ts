// @ts-ignore
import stPetersburgMetroData from "./data/stpetersburg.json"
import { findClosestStations, getStationNames, MetroStation } from "./util.js"

export function getClosestStPetersburgStation(lat: number, lon: number): [MetroStation, number] {
  return findClosestStations(stPetersburgMetroData, lat, lon, 1)[0]
}

export function getClosestStPetersburgStations(lat: number, lon: number, n: number): [MetroStation, number][] {
  return findClosestStations(stPetersburgMetroData, lat, lon, n)
}

export function getStPetersburgStationNames(): string[] {
  return getStationNames(stPetersburgMetroData)
}
