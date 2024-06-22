import transliterate from "@sindresorhus/transliterate"
const haversine = require("haversine")
import kazanMetroData from "./data/kazan.json"
import { MetroStation } from "./metro.js"

interface InternalKazanMetroStation {
  Name: string
  NameTatar: string
  Lat: number
  Lon: number
  LineColor: string
  Line: string
  Order: number
}

const typedKazanMetroData: InternalKazanMetroStation[] = kazanMetroData

export function getClosestKazanStation(
  lat: number,
  lon: number,
): [MetroStation & { nameTatar: string }, number] {
  const stations = typedKazanMetroData.map((station) => ({
    ...station,
    distance: Number(
      haversine(
        { latitude: station.Lat, longitude: station.Lon },
        { latitude: lat, longitude: lon },
        { unit: "meter" },
      ).toFixed(0),
    ),
  }))
  const closest = stations.sort((a, b) => a.distance - b.distance)[0]
  return [
    {
      name: closest.Name,
      nameTatar: closest.NameTatar,
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

export function getClosestKazanStations(
  lat: number,
  lon: number,
  n: number,
): [MetroStation & { nameTatar: string }, number][] {
  const stations = typedKazanMetroData.map((station) => ({
    ...station,
    distance: Number(
      haversine(
        { latitude: station.Lat, longitude: station.Lon },
        { latitude: lat, longitude: lon },
        { unit: "meter" },
      ).toFixed(0),
    ),
  }))

  const closestStations = stations
    .sort((a, b) => a.distance - b.distance)
    .slice(0, n)

  return closestStations.map((station) => [
    {
      name: station.Name,
      nameTatar: station.NameTatar,
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

export function getKazanStationNames(): string[] {
  return typedKazanMetroData.map((station) => station.Name).sort()
}
