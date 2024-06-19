interface IDName {
    ID: string;
    Name: string;
}

interface Status {
    ID: string;
    Name: string;
}

interface AircraftTailNumber {
    ID: string;
    status: Status;
    tail_number: string;
}

interface AircraftTailNumberRequest {
    id?: string;
    status_id: string;
    tail_number: string;
}

interface Aircraft {
    aft_h: string;
    aft_w: string;
    aircraft_tail_numbers: AircraftTailNumber[];
    aircraft_type: string;
    body_type: IDName;
    bulk: string;
    bulk_cubic: Unit;
    bulk_h: string;
    bulk_unit: Unit;
    bulk_w: string;
    cargo_capacity: string;
    cargo_capacity_unit: Unit;
    count: number;
    fwd: string;
    fwd_h: string;
    fwd_w: string;
    fwt: string;
    gl_code: IDName;
    ID: string;
    landing_weight: string;
    landing_weight_unit: Unit;
    manufacturer: string;
    max_bulk_capacity_volume: string;
    max_bulk_capacity_volume_unit: Unit;
    max_bulk_capacity_weight: string;
    max_bulk_capacity_weight_unit: Unit;
    max_dimension_breadth: string;
    max_dimension_height: string;
    max_dimension_length: string;
    max_dimension_unit: Unit;
    max_volume: string;
    max_volume_unit: Unit;
    max_zero_fuel_weight: string;
    max_zero_fuel_weight_unit: Unit;
    mtow: string;
    mtow_unit: Unit;
    passenger_capacity: string;
    restricted_weight_piece: string;
    restricted_weight_piece_unit: Unit;
    status: Status;
    uld_position: string;
    version: string;
}

interface CreateAircraftRequest {
    aircraft_tail_numbers: AircraftTailNumberRequest[];
    aircraft_type: string;
    manufacturer: string;
    aft_h: string;
    aft_w: string;
    body_type_id: string;
    bulk: string;
    bulk_cubic_id: string;
    bulk_h: string;
    bulk_unit_id: string;
    bulk_w: string;
    cargo_capacity: string;
    cargo_capacity_unit_id: string;
    count: number;
    fwd: string;
    fwd_h: string;
    fwd_w: string;
    fwt: string;
    gl_code_id: string;
    landing_weight: string;
    landing_weight_unit_id: string;
    max_bulk_capacity_volume: string;
    max_bulk_capacity_volume_unit_id: string;
    max_bulk_capacity_weight: string;
    max_bulk_capacity_weight_unit_id: string;
    max_dimension_breadth: string;
    max_dimension_height: string;
    max_dimension_length: string;
    max_dimension_unit_id: string;
    max_volume: string;
    max_volume_unit_id: string;
    max_zero_fuel_weight: string;
    max_zero_fuel_weight_unit_id: string;
    mtow: string;
    mtow_unit_id: string;
    passenger_capacity: string;
    restricted_weight_piece: string;
    restricted_weight_piece_unit_id: string;
    status_id: string;
    uld_position: string;
    version: string;
}
