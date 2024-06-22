import transliterate from "@sindresorhus/transliterate"
import * as haversine from "haversine"
import stPetersburgMetroData from "./data/stpetersburg.json"
import { MetroStation } from "./metro.js"

interface InternalStPetersburgMetroStation {
  Name: string
  Lat: number
  Lon: number
  LineColor: string
  Line: string
  Order: number
}

const typedStPetersburgMetroData: InternalStPetersburgMetroStation[] =
  stPetersburgMetroData

export function getClosestStPetersburgStation(
  lat: number,
  lon: number,
): [MetroStation, number] {
  const stations = typedStPetersburgMetroData.map((station) => ({
    ...station,
    distance: Number(
      haversine
        .default(
          { latitude: station.Lat, longitude: station.Lon },
          { latitude: lat, longitude: lon },
          { unit: "meter" },
        )
        .toFixed(0),
    ),
  }))
  const closest = stations.sort((a, b) => a.distance - b.distance)[0]
  return [
    {
      name: closest.Name,
      nameTranslit: transliterate(closest.Name),
      lat: closest.Lat,
      lon: closest.Lon,
      lineColor: closest.LineColor,
      lineName: closest.Line,
      lineNameTranslit: transliterate(closest.Line),
      order: closest.Order,
    },
    closest.distance,
  ]
}

export function getClosestStPetersburgStations(
  lat: number,
  lon: number,
  n: number,
): [MetroStation, number][] {
  const stations = typedStPetersburgMetroData.map((station) => ({
    ...station,
    distance: Number(
      haversine
        .default(
          { latitude: station.Lat, longitude: station.Lon },
          { latitude: lat, longitude: lon },
          { unit: "meter" },
        )
        .toFixed(0),
    ),
  }))

  const closestStations = stations
    .sort((a, b) => a.distance - b.distance)
    .slice(0, n)

  return closestStations.map((station) => [
    {
      name: station.Name,
      nameTranslit: transliterate(station.Name),
      lat: station.Lat,
      lon: station.Lon,
      lineColor: station.LineColor,
      lineName: station.Line,
      lineNameTranslit: transliterate(station.Line),
      order: station.Order,
    },
    station.distance,
  ])
}

export function getStPetersburgStationNames(): string[] {
  return typedStPetersburgMetroData.map((station) => station.Name).sort()
}
