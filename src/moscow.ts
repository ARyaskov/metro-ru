import transliterate from "@sindresorhus/transliterate"
const haversine = require("haversine")
import moscowMetroData from "./data/moscow.json"
import { MetroStation } from "./metro.js"

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
  Salatovaya = "BED12C",
}

interface InternalMoscowMetroStation {
  Name: string
  Longitude: number
  LineColor: string
  Latitude: number
  Line: string
  Order: number
}

const typedMoscowMetroData: InternalMoscowMetroStation[] = moscowMetroData

export function getClosestMoscowStation(
  lat: number,
  lon: number,
): [MetroStation, number] {
  const stations = typedMoscowMetroData.map((station) => ({
    ...station,
    distance: Number(
      haversine(
        { latitude: station.Latitude, longitude: station.Longitude },
        { latitude: lat, longitude: lon },
        { unit: "meter" },
      ).toFixed(0),
    ),
  }))
  const closest = stations.sort((a, b) => a.distance - b.distance)[0]
  return [
    {
      name: closest.Name,
      nameTranslit: transliterate(closest.Name),
      lon: closest.Longitude,
      lat: closest.Latitude,
      lineColor: "#" + closest.LineColor,
      lineName: closest.Line,
      lineNameTranslit: transliterate(closest.Line),
      order: closest.Order,
    },
    closest.distance,
  ]
}

export function getClosestMoscowStations(
  lat: number,
  lon: number,
  n: number,
): [MetroStation, number][] {
  const stations = typedMoscowMetroData.map((station) => ({
    ...station,
    distance: Number(
      haversine(
        { latitude: station.Latitude, longitude: station.Longitude },
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
      nameTranslit: transliterate(station.Name),
      lat: station.Latitude,
      lon: station.Longitude,
      lineColor: "#" + station.LineColor,
      lineName: station.Line,
      lineNameTranslit: transliterate(station.Line),
      order: station.Order,
    },
    station.distance,
  ])
}

export function getMoscowStationsByLineColor(
  line: LineColorsMnemonicRu,
): MetroStation[] {
  return typedMoscowMetroData
    .filter((e) => e.LineColor === line)
    .sort((a, b) => a.Order - b.Order)
    .map((station) => ({
      name: station.Name,
      nameTranslit: transliterate(station.Name),
      lat: station.Latitude,
      lon: station.Longitude,
      lineColor: "#" + station.LineColor,
      lineName: station.Line,
      lineNameTranslit: transliterate(station.Line),
      order: station.Order,
    }))
}

export function getMoscowStationNamesByLineColor(
  line: LineColorsMnemonicRu,
): string[] {
  return typedMoscowMetroData
    .filter((e) => e.LineColor === line)
    .sort((a, b) => a.Order - b.Order)
    .map((station) => station.Name)
}

export function getMoscowStationNames(): string[] {
  return typedMoscowMetroData.map((station) => station.Name).sort()
}
