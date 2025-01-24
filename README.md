# Metro RU
[![Module type: MinChrome](https://img.shields.io/badge/MinChromeVersion-Chrome%2051-brightgreen)]()
[![Module type: MinNode](https://img.shields.io/badge/MinNodeVersion-Node.js%2016.17-brightgreen)]()
[![Module type: CJS+ESM](https://img.shields.io/badge/module%20type-cjs%2Besm-brightgreen)]()
[![Module type: target-ES2016](https://img.shields.io/badge/target-ES2016-brightgreen)]()


Russian Cities metro (subway) stations data with methods 
for calculating a distance between given coordinate and station (using [Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula)):
- Moscow Metro
- Saint Petersburg Metro
- Kazan Metro
- Ekaterinburg Metro
- *in progress* Nizhny Novgorod Metro
- *in progress* Novosibirsk Metro
- *in progress* Samara Metro


# Use

### with HTML
```html
<script src="https://cdn.jsdelivr.net/npm/@riaskov/metro-ru@1/dist/browser/metro-ru.min.js"></script>
```

### with Node.js
package.json:
```json
"dependencies": {
  "@riaskov/metro-ru": "^1.x.x"
}
```

your code:
```js
import { getClosestStations } from '@riaskov/metro-ru'

console.log(getClosestStations(City.Moscow, 55.640918, 37.754337, 2))
```


# TODO

- add English translation of stations names
- add an address of each station
- automatically push browser minified version to CDN
- create super-minimal (<10 KBytes; now it's 40 KBytes) version for browser
- add mocha/chai tests

# API

## Data structures

Available cities:
```typescript
enum City {
    Moscow = "Moscow",
    SaintPetersburg = "SaintPetersburg",
    Ekaterinburg = "Ekaterinburg",
    Kazan = "Kazan"
}
```

Metro station description:
```typescript
interface MetroStation {
    name: string
    nameTranslit: string
    lat: number
    lon: number
    lineColor: string
    lineName: string
    lineNameTranslit: string
    order: number
}
```
| Field              | Type     | Description                                                      |
|--------------------|----------|------------------------------------------------------------------|
| `name`             | `string` | Russian name of station                                          |
| `nameTranslit`     | `string` | Transliterated name of station                                   |
| `lat`              | `number` | Latitude of your coordinate                                      |
| `lon`              | `number` | Longitude of your coordinate                                     |
| `lineColor`        | `string` | Color of the line in #HEX                                        |
| `lineName`         | `string` | Russian name of the line                                         |
| `lineNameTranslit` | `string` | Transliterated name of the line                                  |
| `order`            | `number` | Order of the station in the line (from 0 - the Northern station) |



## Functions

### Getting the closest station by city and coordinate (Lat+Lon)

```typescript
function getClosestStation(
    city: City,
    lat: number,
    lon: number,
): [MetroStation, number] | null
```
Params: 

| Param  | Type     | Description                  |
|--------|----------|------------------------------|
| `city` | `City`   | Name of the city in Russian  |
| `lat`  | `number` | Latitude of your coordinate  |
| `lon`  | `number` | Longitude of your coordinate | 

Returns the closest station (MetroStation-part) with distance in meters (number-part) from the given coordinate.
Returns `null` if you pass an incorrect city name.

Example:
```typescript
import { City, getClosestStation } from "@riaskov/metro-ru"

console.log(getClosestStation(City.Moscow, 55.640918, 37.754337))
```

<details>
  <summary>Show example's output</summary>

  ```typescript
[
    {
        name: 'Алма-Атинская',
        nameTranslit: 'Alma-Atinskaya',
        lat: 55.63349,
        lon: 37.765678, 
        lineColor: '#4FB04F',
        lineName: 'Замоскворецкая',
        lineNameTranslit: 'Zamoskvoretskaya',
        order: 21
    },
    1090
]

```  
</details>


### Getting the N closest stations by city and coordinate (Lat+Lon)

```typescript
import { City, getClosestStations } from "@riaskov/metro-ru"

function getClosestStations(
    city: City,
    lat: number,
    lon: number,
    n: number,
): [MetroStation, number][] | null
```
Params:

| Param  | Type     | Description                  |
|--------|----------|------------------------------|
| `city` | `City`   | Name of the city in Russian  |
| `lat`  | `number` | Latitude of your coordinate  |
| `lon`  | `number` | Longitude of your coordinate | 

Returns an array of N closest stations (MetroStation-part) with distances in meters (number-part)
(array of tuples like `[MetroStation, number]`). 
Returns `null` if you pass an incorrect city name.

Example:
```typescript
import { getClosestStations } from '@riaskov/metro-ru'

console.log(getClosestStations(City.Moscow, 55.640918, 37.754337, 2))
```

<details>
  <summary>Show example's output</summary>

```typescript
[
  [
    {
      name: 'Алма-Атинская',
      nameTranslit: 'Alma-Atinskaya', 
      lat: 55.63349,
      lon: 37.765678,
      lineColor: '#4FB04F',
      lineName: 'Замоскворецкая',
      lineNameTranslit: 'Zamoskvoretskaya',
      order: 21
    },
    1090
  ],
  [
    {
      name: 'Марьино',
      nameTranslit: 'Marino',
      lat: 55.649158,
      lon: 37.743844,
      lineColor: '#BED12C',
      lineName: 'Люблинско-Дмитровская',
      lineNameTranslit: 'Lyublinsko-Dmitrovskaya',
      order: 16
    },
    1128
  ]
]
```  
</details>

# License

MIT (see the [LICENSE](LICENSE) file).

# Acknowledgements

This project uses Open Data files provided [data.mos.ru](https://data.mos.ru/opendata/7704786030-stantsii-moskovskogo-metropolitena) ([Creative Commons Attribution 3.0](https://creativecommons.org/licenses/by/3.0/deed.en))