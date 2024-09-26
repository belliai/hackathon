import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, ContainerIcon, Plane, Users } from 'lucide-react';
import { FlightContent } from '../../components/flight-content';
import { Progress } from '@/components/ui/progress';
import { AWBData, DeckDetails, FlightData } from "../../types";
import { useLoadPlanningDetailsContext } from "../../contexts/load-planning-details-context";
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import moment from "moment";
import { countPercentage } from "../../utils";
import { useEffect, useState } from "react";

interface CapacitySplit {
  capacity: number;
  current_capacity: number;
}

const DroppableArea: React.FC<{
  id: string
  items: AWBData[]
  onSort: (id: string, items: AWBData[]) => void
  flightDetails: FlightData & { upper_deck: DeckDetails; lower_deck: DeckDetails }
}> = ({ id, items, onSort, flightDetails }) => {
  const { setNodeRef, isOver } = useDroppable({ id })
  const [ULDList, setULDList] = useState<CapacitySplit[]>([])

  const containerStyle = { // Change to your preferred colors
    transition: 'background-color 0.3s ease',
  };

  const createCapacitySplit = (flightData: FlightData & { upper_deck: DeckDetails; lower_deck: DeckDetails }) => {
    const lowerDeckCapacity = Number(flightData.lower_deck.maximum_capacity); // Ensure it's a number
    const capacityPerPart = lowerDeckCapacity / 10;
    let remainingCurrentCapacity = Number(flightData.lower_deck.current_capacity); // Ensure it's a number

    const splittedCapacity = Array(10).fill(null).map(() => {
      const currentCapacity = Math.min(remainingCurrentCapacity, capacityPerPart);
      remainingCurrentCapacity -= currentCapacity;
      
      return {
        capacity: capacityPerPart,
        current_capacity: currentCapacity
      };
    });
    
    setULDList(splittedCapacity)
  }

  useEffect(() => {
    createCapacitySplit(flightDetails)
  }, [flightDetails])

  return (
    <SortableContext
      items={items.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <div className={`w-full flex flex-col justify-center items-center overflow-x-hidden pt-8 ${isOver ? 'bg-primary-foreground' : 'bg-card'}`} style={containerStyle} ref={setNodeRef}>
        <div className="w-[356px] h-fit shrink-0">
          <svg
            className="h-fit w-full"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="rotate(90 200 200) translate(0 50)">
              <path
                d="M0 150C0 139.254 11.1932 111.557 59.0328 89.9089C118.8313 62.7863 221.1738 10.9195 313.1807 10.9195H400V289.081H313.1807C221.1738 289.081 118.8313 237.214 59.0328 210.091C11.1932 188.443 0 160.746 0 150Z"
                fill="#4D4D4D"
              />

              <path
                transform="translate(130, 80)"
                d="M70.5857 135.481L70.5857 136.947L53.4372 136.947C47.8273 136.947 27.6826 128.976 13.594 110.1L12.7015 108.888L31.6987 108.888L31.89 109.207C45.4685 127.382 65.2945 135.481 70.5857 135.481ZM15.6977 110.355C29.2125 127.701 48.2735 135.417 53.4372 135.417L64.1471 135.417C55.5409 132.356 41.5799 124.385 31.0613 110.355L15.6977 110.355Z"
                fill="url(#paint0_linear_1_15298)"
              />
              <path
                transform="translate(130, 80)"
                d="M30.2964 31.0249L29.5315 32.1727C22.3916 43.1412 18.7579 55.5126 18.7579 68.9681C18.7579 82.4236 22.3916 94.7952 29.5315 105.764L30.2964 106.911L11.3629 106.911L11.1717 106.593C3.84055 95.3689 0.143126 82.7425 0.143126 68.9681C0.143125 55.1937 3.84055 42.5673 11.1717 31.3437L11.3629 31.0249L30.2964 31.0249ZM17.2916 68.9681C17.2916 55.7039 20.7341 43.3962 27.5552 32.4915L12.1917 32.4915C5.1793 43.3325 1.60933 55.6401 1.60933 68.9681C1.60933 82.2961 5.1793 94.54 12.1917 105.445L27.5552 105.445C20.7341 94.4762 17.2916 82.2323 17.2916 68.9681Z"
                fill="url(#paint1_linear_1_15298)"
              />
              <path
                transform="translate(130, 80)"
                d="M70.5858 0.925292L70.5858 2.39188C65.3584 2.39188 45.4687 10.4909 31.9539 28.6654L31.7626 28.9842L12.7654 28.9842L13.6579 27.7725C27.6827 8.89652 47.8274 0.925293 53.5011 0.925293L70.5858 0.925292ZM30.9976 27.5174C41.58 13.4879 55.4773 5.51669 64.0834 2.45571L53.3736 2.45572C48.2099 2.45572 29.1489 10.1719 15.6341 27.5174L30.9976 27.5174Z"
                fill="url(#paint2_linear_1_15298)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_1_15298"
                x1="41.6404"
                y1="136.947"
                x2="41.6404"
                y2="108.89"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="1" stop-color="white" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1_15298"
                x1="15.207"
                y1="106.896"
                x2="15.207"
                y2="30.9962"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="1" stop-color="white" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_1_15298"
                x1="41.6405"
                y1="29.0014"
                x2="41.6405"
                y2="0.945063"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="1" stop-color="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="relative w-[248px] h-fit min-h-[450px] items-center bg-[#4D4D4D]">
          <div className="absolute -left-[314px] top-[50px]">
            <svg
              width="315"
              height="224"
              viewBox="0 0 315 224"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <path d="M1 172L314.5 1V204L1 223V172Z" fill="#303030" />
            </svg>
          </div>
          <div className="absolute left-[247px] top-[50px]">
            <svg
              width="315"
              height="224"
              viewBox="0 0 315 224"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="-"
            >
              <path d="M314.5 172L1 1V204L314.5 223V172Z" fill="#303030" />
            </svg>
          </div>
          
          <div className="grid grid-cols-2 px-3 gap-3 -mt-16 pb-[100px]">
            {ULDList.map((uld, index) => (
              <div className="bg-button-primary flex flex-col items-center justify-center rounded-md aspect-square text-white" key={`uld-${index+1}`}>
                <span className="text-sm font-bold">{countPercentage(uld.current_capacity.toString(), uld.capacity.toString())}</span>
                <span className="text-xs">{uld.current_capacity}/{uld.capacity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="z-0 w-[315px] h-fit shrink-0">
          <svg
            className="h-full w-fit"
            viewBox="0 0 300 325"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="rotate(-90 150 150)">
              <path
                d="M0 150C0 142.627 16.7898 114.93 88.5492 93.2822C178.247 65.5726 331.7608 10.9195 469.771 10.9195H500V289.081H469.771C331.7608 289.081 178.247 234.427 88.5492 206.718C16.7898 185.07 0 157.373 0 150Z"
                fill="#4D4D4D"
              />
            </g>
          </svg>
        </div>
      </div>
    </SortableContext>
  )
}

const MiddleSection: React.FC = () => {
  const { handleSort, droppedItems, flightDetails } = useLoadPlanningDetailsContext();

  return (
    <section className="w-1/3 flex flex-col gap-4">
      <div className="bg-card border rounded-lg p-3 flex flex-col gap-3">
        <div className="flex justify-between gap-2">
          <div className="flex flex-col">
            <h3 className="flex gap-1 items-center">
              <Plane className="size-4" />
              <span className="font-bold">{flightDetails.flight_code}</span>
            </h3>
            <span className="text-xs text-muted-foreground">
              {`${flightDetails.aircraft} | ${flightDetails.tail_number}`}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <h3 className="flex gap-1 items-center">
              <span className="font-bold">{flightDetails.origin}</span>
              <ArrowRight className="size-4" />
              <span className="font-bold">{flightDetails.destination}</span>
            </h3>
            <span className="text-xs text-muted-foreground flex gap-1 items-center">
              <Users className="size-3" />
              220 Passengers
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <FlightContent
              title="Departure"
              content={
                <div className="flex gap-1 flex-col xl:flex-row">
                  <div className="flex gap-1 text-xs font-bold items-center">
                    <Calendar className="size-3" />
                    {moment(flightDetails.departure).format('MMM DD, YYYY')}
                  </div>
                  <div className="flex gap-1 text-xs font-bold items-center">
                    <Clock className="size-3" />
                    {moment(flightDetails.departure).format('HH:mm')}
                  </div>
                </div>
              }
            />
            <FlightContent
              title="Arrival"
              content={
                <div className="flex flex-col xl:flex-row gap-1">
                  <div className="flex gap-1 text-xs font-bold items-center">
                    <Calendar className="size-3" />
                    {moment(flightDetails.arrival).format('MMM DD, YYYY')}
                  </div>
                  <div className="flex gap-1 text-xs font-bold items-center">
                    <Clock className="size-3" />
                    {moment(flightDetails.arrival).format('HH:mm')}
                  </div>
                </div>
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <text className="text-xs text-muted-foreground">Cargo Capacity</text>
            <Progress value={parseFloat(countPercentage(flightDetails.current_capacity, flightDetails.maximum_capacity))} />
            <div className="flex justify-between">
              <text className='text-xs font-bold'>{`${flightDetails.current_capacity}/${flightDetails.maximum_capacity}${flightDetails.unit}`}</text>
              <text className='text-xs font-bold'>{`${parseFloat(countPercentage(flightDetails.current_capacity, flightDetails.maximum_capacity))}%`}</text>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <text className="text-xs text-muted-foreground">Lower Deck</text>
              <Progress value={parseFloat(countPercentage(flightDetails.lower_deck.current_capacity, flightDetails.lower_deck.maximum_capacity))} />
              <div className="flex justify-between">
                <text className='text-xs font-bold'>{`${flightDetails.lower_deck.current_capacity}/${flightDetails.lower_deck.maximum_capacity}${flightDetails.unit}`}</text>
                <text className='text-xs font-bold'>{`${parseFloat(countPercentage(flightDetails.lower_deck.current_capacity, flightDetails.lower_deck.maximum_capacity))}%`}</text>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <text className="text-xs text-muted-foreground">Upper Deck</text>
              <Progress value={parseFloat(countPercentage(flightDetails.upper_deck.current_capacity, flightDetails.upper_deck.maximum_capacity))} />
              <div className="flex justify-between">
                <text className='text-xs font-bold'>{`${flightDetails.upper_deck.current_capacity}/${flightDetails.upper_deck.maximum_capacity}${flightDetails.unit}`}</text>
                <text className='text-xs font-bold'>{`${parseFloat(countPercentage(flightDetails.upper_deck.current_capacity, flightDetails.upper_deck.maximum_capacity))}%`}</text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card border rounded-lg p-3 flex flex-col gap-3">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h3 className="flex gap-1 items-center">
              <ContainerIcon className="size-4" />
              <span className="font-bold">Load Planning</span>
            </h3>
            <div className="flex gap-1">
              <Button size="sm" variant="secondary">Lower Deck</Button>
              <Button size="sm" variant="secondary">Upper Deck</Button>
            </div>
            
          </div>
          <DroppableArea
            id={`droppable-aircraft`}
            items={droppedItems[`droppable-aircraft`] || []}
            onSort={(id, items) => handleSort(id, items)}
            flightDetails={flightDetails}
          />
        </div>
      </div>
    </section>
  )
}

export { MiddleSection }
