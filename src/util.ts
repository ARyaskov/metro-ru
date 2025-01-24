import transliterate from "@sindresorhus/transliterate"

export interface MetroStation {
  name: string
  nameTranslit: string
  lat: number
  lon: number
  lineColor: string
  lineName: string
  lineNameTranslit: string
  order: number
  nameTatar?: string
}

export interface GeoPoint {
  latitude: number
  longitude: number
}

/**
 * Calculates the distance between two points on Earth in meters using the Haversine formula
 * @param {Object} start Starting point with latitude and longitude
 * @param {Object} end Ending point with latitude and longitude
 * @returns {number} Distance in meters
 */
export function calculateDistance(start: GeoPoint, end: GeoPoint) {
  const EARTH_RADIUS = 6371000 // Earth's radius in meters
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180

  // Convert latitude and longitude to radians
  const lat1 = toRadians(start.latitude)
  const lat2 = toRadians(end.latitude)
  const deltaLat = toRadians(end.latitude - start.latitude)
  const deltaLon = toRadians(end.longitude - start.longitude)

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return EARTH_RADIUS * c
}

export interface BaseStation {
  Name: string
  Line: string
  LineColor: string
  Order: number
}

export interface StandardStation extends BaseStation {
  Lat: number
  Lon: number
}

export interface KazanStation extends StandardStation {
  NameTatar: string
}

type InternalStation = StandardStation | KazanStation

function normalizeCoordinates(station: StandardStation): GeoPoint {
  return { latitude: station.Lat, longitude: station.Lon }
}

function convertToMetroStation(station: StandardStation): MetroStation {
  const coordinates = normalizeCoordinates(station)
  const baseStation: MetroStation = {
    name: station.Name,
    nameTranslit: transliterate(station.Name),
    lat: coordinates.latitude,
    lon: coordinates.longitude,
    lineColor: station.LineColor.startsWith("#") ? station.LineColor : "#" + station.LineColor,
    lineName: station.Line,
    lineNameTranslit: transliterate(station.Line),
    order: station.Order
  }

  if ("NameTatar" in station) {
    return { ...baseStation, nameTatar: station.NameTatar as string }
  }

  return baseStation
}

export function findClosestStations<T extends StandardStation>(stations: T[], lat: number, lon: number, n: number): [MetroStation, number][] {
  const point: GeoPoint = { latitude: lat, longitude: lon }

  return stations
    .map((station) => ({
      ...station,
      distance: Number(calculateDistance(normalizeCoordinates(station), point).toFixed(0))
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, n)
    .map((station) => [convertToMetroStation(station), station.distance])
}

export function getStationNames(stations: BaseStation[]): string[] {
  return stations.map((station) => station.Name).sort()
}

export function getStationsByLineColor<T extends InternalStation>(stations: T[], lineColor: string): MetroStation[] {
  return stations
    .filter((station) => station.LineColor === lineColor)
    .sort((a, b) => a.Order - b.Order)
    .map((station) => convertToMetroStation(station))
}

export function getStationNamesByLineColor<T extends InternalStation>(stations: T[], lineColor: string): string[] {
  return stations
    .filter((station) => station.LineColor === lineColor)
    .sort((a, b) => a.Order - b.Order)
    .map((station) => station.Name)
}
