import transliterate from "@sindresorhus/transliterate"
import haversine from "haversine"
import ekaterinburgMetroData from "./data/ekaterinburg.json"
import { MetroStation } from "./metro.js"

interface InternalEkaterinburgMetroStation {
  Name: string
  Longitude: number
  LineColor: string
  Latitude: number
  Line: string
  Order: number
}

const typedEkaterinburgMetroData: InternalEkaterinburgMetroStation[] =
  ekaterinburgMetroData

export function getClosestEkaterinburgStation(
  lat: number,
  lon: number,
): [MetroStation, number] {
  const stations = typedEkaterinburgMetroData.map((station) => ({
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

export function getClosestEkaterinburgStations(
  lat: number,
  lon: number,
  n: number,
): [MetroStation, number][] {
  const stations = typedEkaterinburgMetroData.map((station) => ({
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
      lon: station.Longitude,
      lat: station.Latitude,
      lineColor: "#" + station.LineColor,
      lineName: station.Line,
      lineNameTranslit: transliterate(station.Line),
      order: station.Order,
    },
    station.distance,
  ])
}

export function getEkaterinburgStationNames(): string[] {
  return typedEkaterinburgMetroData.map((station) => station.Name).sort()
}
