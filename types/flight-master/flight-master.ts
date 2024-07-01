interface IDNameType {
    ID: string;
    name: string;
}

interface IDValueType {
    ID: string;
    value: string;
}

interface UOMType extends IDNameType {
    symbol: string;
}

interface Flight {
    aircraft: Aircraft;
    arrival_d: number;
    arrival_h: number;
    arrival_m: number;
    capacity: number;
    departure_d: number;
    departure_h: number;
    departure_m: number;
    destination: IDNameType;
    flight_no: string;
    flight_type: IDValueType;
    fri: boolean;
    from_date: string;
    ID: string;
    mon: boolean;
    sat: boolean;
    sector: IDValueType;
    source: IDNameType;
    status: IDValueType;
    sun: boolean;
    tail: AircraftTailNumber;
    thu: boolean;
    to_date: string;
    tue: boolean;
    uom: UOMType;
    wed: boolean;
    created_at: string;
    updated_at: string;
}

interface CreateFlightMasterPayload {
    aircraft_id: string;
    capacity: number;
    destination_id: string;
    flight_no: string;
    flight_type_id: string;
    sector_id: string;
    source_id: string;
    status_id: string;
    tail_id: string;
    from_date: string;
    to_date: string;
    uom_id: string;
    arrival_d: number;
    arrival_h: number;
    arrival_m: number;
    departure_d: number;
    departure_h: number;
    departure_m: number;
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
    sun: boolean;
}
