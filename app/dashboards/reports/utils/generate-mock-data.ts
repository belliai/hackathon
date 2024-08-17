import { addDays, format, subDays } from "date-fns"

// Define the TypeScript type for the data
export type FlightData = {
  route: string
  volume: number
  volumeCapacity: number
  volumeUtilization: number
  weight: number
  weightCapacity: number
  weightUtilization: number
  origin: string
  destination: string
  date: string
  revenue: number
  revenuePerKg: number
  revenuePerFlight: number
}

// Function to generate random number within a range
const getRandomInRange = (min: number, max: number): number =>
  Math.round(Math.random() * (max - min) + min)

// Constants
const startDate = subDays(new Date(), 7)
const endDate = addDays(new Date(), 7)

// Generate dates array
const generateDatesArray = (start: Date, end: Date): Date[] => {
  const dates: Date[] = []
  for (let d = start; d <= end; d = addDays(d, 1)) {
    dates.push(d)
  }
  return dates
}

const datesArray = generateDatesArray(startDate, endDate)

// Function to get a random airport code that is different from the given code
const getRandomDifferentCode = (code: string, codes: string[]): string => {
  let newCode: string
  do {
    newCode = codes[Math.floor(Math.random() * codes.length)]
  } while (newCode === code)
  return newCode
}

const dailyDataCount = Math.floor(Math.random() * 3) + 1 // 1-3 data points per day

// Function to generate unique route combinations
const generateRouteCombinations = (
  locations: string[],
  maxCombinations: number
): [string, string][] => {
  const combinations: [string, string][] = []
  const usedLocations = new Set<string>()

  while (
    combinations.length < maxCombinations &&
    combinations.length < locations.length * (locations.length - 1)
  ) {
    const origin = locations[Math.floor(Math.random() * locations.length)]
    const destination = getRandomDifferentCode(origin, locations)
    const route = `${origin}-${destination}`

    if (!usedLocations.has(route)) {
      combinations.push([origin, destination])
      usedLocations.add(route)
    }
  }

  return combinations
}

// Mock data generation function
const generateMockData = (locations: string[]): FlightData[] => {
  const data: FlightData[] = []
  const routeCombinations = generateRouteCombinations(locations, 12)

  datesArray.forEach((date) => {
    for (let i = 0; i < dailyDataCount; i++) {
      const volumeCapacity = 5000
      const volume = getRandomInRange(volumeCapacity / 2, volumeCapacity)
      const volumeUtilization = (volume / volumeCapacity) * 100
      const weightCapacity = 35000
      const weight = getRandomInRange(weightCapacity / 2, weightCapacity)
      const weightUtilization = (weight / weightCapacity) * 100
      const revenue = Math.round(getRandomInRange(0, 175000))
      const revenuePerKg = Math.round(revenue / weight)
      const revenuePerFlight = revenue / dailyDataCount

      const [origin, destination] =
        routeCombinations[Math.floor(Math.random() * routeCombinations.length)]

      data.push({
        volume,
        volumeCapacity,
        volumeUtilization,
        weight,
        weightCapacity,
        weightUtilization,
        route: `${origin}-${destination}`,
        origin,
        destination,
        date: format(date, "yyyy-MM-dd"),
        revenue,
        revenuePerKg,
        revenuePerFlight,
      })
    }
  })

  return data
}

// Function to group data by route
const groupDataByRoute = (data: FlightData[]): FlightData[] => {
  const grouped: { [route: string]: FlightData } = {}

  data.forEach((item) => {
    const route = `${item.origin}-${item.destination}`
    if (!grouped[route]) {
      grouped[route] = { ...item }
    } else {
      grouped[route].volume += item.volume
      grouped[route].volumeCapacity += item.volumeCapacity
      grouped[route].volumeUtilization =
        (grouped[route].volume / grouped[route].volumeCapacity) * 100
      grouped[route].weight += item.weight
      grouped[route].weightCapacity += item.weightCapacity
      grouped[route].weightUtilization =
        (grouped[route].weight / grouped[route].weightCapacity) * 100
      grouped[route].revenue += item.revenue
      grouped[route].revenuePerKg = Math.round(
        grouped[route].revenue / grouped[route].weight
      )
      grouped[route].revenuePerFlight = grouped[route].revenue / dailyDataCount
    }
  })

  return Object.values(grouped)
}

// Function to group data by date
const groupDataByDate = (data: FlightData[]): FlightData[] => {
  const grouped: { [date: string]: FlightData } = {}

  data.forEach((item) => {
    const date = item.date
    if (!grouped[date]) {
      grouped[date] = { ...item }
    } else {
      grouped[date].volume += item.volume
      grouped[date].volumeCapacity += item.volumeCapacity
      grouped[date].volumeUtilization =
        (grouped[date].volume / grouped[date].volumeCapacity) * 100
      grouped[date].weight += item.weight
      grouped[date].weightCapacity += item.weightCapacity
      grouped[date].weightUtilization =
        (grouped[date].weight / grouped[date].weightCapacity) * 100
      grouped[date].revenue += item.revenue
      grouped[date].revenuePerKg = Math.round(
        grouped[date].revenue / grouped[date].weight
      )
      grouped[date].revenuePerFlight = grouped[date].revenue / dailyDataCount
    }
  })

  return Object.values(grouped)
}

// Generate and group the mock data by route and by date

export {
  generateMockData,
  groupDataByRoute,
  groupDataByDate,
  startDate,
  endDate,
}
