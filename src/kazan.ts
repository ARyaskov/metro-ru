// @ts-ignore
import kazanMetroData from "./data/kazan.json"
import { findClosestStations, getStationNames, MetroStation } from "./util.js"

export function getClosestKazanStation(lat: number, lon: number): [MetroStation & { nameTatar: string }, number] {
  return findClosestStations(kazanMetroData, lat, lon, 1)[0] as [MetroStation & { nameTatar: string }, number]
}

export function getClosestKazanStations(lat: number, lon: number, n: number): [MetroStation & { nameTatar: string }, number][] {
  return findClosestStations(kazanMetroData, lat, lon, n) as [MetroStation & { nameTatar: string }, number][]
}

export function getKazanStationNames(): string[] {
  return getStationNames(kazanMetroData)
}
