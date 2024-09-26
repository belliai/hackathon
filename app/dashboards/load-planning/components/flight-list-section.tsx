import { DUMMY_FLIGHT_DATAS } from "../constants"
import { FlightCard } from "./flight-card"

const FlightListSection: React.FC = () => {
  return (
    <section className="w-full grid grid-cols-2 gap-4 mt-4">
      {DUMMY_FLIGHT_DATAS.map(flight => (
        <FlightCard {...flight} key={flight.id} />
      ))}
    </section>
  )
}

export { FlightListSection }
