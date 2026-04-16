import { decode } from "./Decode";

export class PlacesSearchResult {
    errorMessage?: string;
    htmlAttributions?: Array<string>;
    results?: Array<Results>;
    status?: string;

    constructor(init?: Partial<PlacesSearchResult>) {
        Object.assign(this, init);
    }

}

export class Results {
    business_status?: string;
    formatted_address?: string;
    geometry?: Geometry;
    icon?: string;
    icon_background_color?: string;
    icon_mask_base_uri?: string;
    name?: string;
    opening_hours?: OpeningHours;
    photos?: Array<Photos>;
    place_id?: string;
    plus_code?: PlusCode;
    rating?: number;
    reference?: string;
    types?: Array<string>;
    user_ratings_total?: number;
    defaultName?: string
    constructor(init?: Partial<Results>) {
        Object.assign(this, init);
    }

}

export class Geometry {
    location?: Location;
    viewport?: Viewport;

    constructor(init?: Partial<Geometry>) {
        Object.assign(this, init);
    }

}


export class Location {
    lat?: number;
    lng?: number;

    constructor(init?: Partial<Location>) {
        Object.assign(this, init);
    }
    public get getLocationString() {
        return `${this.lat},${this.lng}`;
    }
    public CloneTo(target: Location) {
        this.lat = target.lat;
        this.lng = target.lng;
    }
    public toString() {
        return `${this.lat},${this.lng}`;
    }
}

export class Viewport {
    northeast?: Location;
    southwest?: Location;
    constructor(init?: Partial<Viewport>) {
        Object.assign(this, init);
    }
}

export class OpeningHours {
    open_now?: boolean;
    weekday_text?: Array<string>;

    constructor(init?: Partial<OpeningHours>) {
        Object.assign(this, init);
    }
}


export class Photos {
    height?: number;
    html_attributions?: Array<string>;
    photo_reference?: string;
    width?: number;

    constructor(init?: Partial<Photos>) {
        Object.assign(this, init);
    }
}


export class PlusCode {
    compound_code?: string;
    global_code?: string;

    constructor(init?: Partial<PlusCode>) {
        Object.assign(this, init);
    }
}


export class MaasTravelMode {
    constructor(name?: string) {
        this._name = name;
    }

    _name: string;

    static get values() {

        return [
            MaasTravelMode.bicycling,
            MaasTravelMode.driving,
            MaasTravelMode.transit,
            MaasTravelMode.walking];
    }

    ///交通方式
    static bicycling: MaasTravelMode = new MaasTravelMode('bicycling');

    ///交通方式
    static driving: MaasTravelMode = new MaasTravelMode('driving');

    ///交通方式
    static transit: MaasTravelMode = new MaasTravelMode('transit');

    ///交通方式
    static walking: MaasTravelMode = new MaasTravelMode('walking');

    public toString() {
        return this._name;
    }
}
enum TransitEnum {
    BUS = "bus",
    RAIL = "rail",
    SUBWAY = "subway",
    TRAIN = "train",
    TRAM = "tram"
}

export class TransitOptions {
    constructor() {

    }
    // 值都以小寫為主
    // BUS 表示計算出的路線應優先選擇以公車做為交通方式。
    // RAIL 表示計算出的路線應優先選擇以火車、電車、輕軌電車和地鐵做為交通方式。
    // SUBWAY 表示計算出的路線應優先選擇以地鐵做為交通方式。
    // TRAIN 表示計算出的路線應優先選擇以火車做為交通方式。
    // TRAM 表示計算出的路線應優先選擇以電車和輕軌電車做為交通方式。
    //train|tram|subway|bus
    transitMode?: string;
    // FEWER_TRANSFERS 表示計算出的路線應優先選擇轉乘次數較少的選項。
    // LESS_WALKING 表示計算出的路線應優先選擇步行距離較短的選項。
    transitRoutingPreference?: string;
    departureTime?: string;

    public SetTransitModeBus() {
        this.transitMode = TransitEnum.BUS;
        return this;
    }
    public SetTransitMode(mode) {
        this.transitMode = mode;
        return this;
    }
    public setDepartureTime(time) {
        this.departureTime = time;
        return this;
    }
    public setTransitRoutingPreference(type) {
        this.transitRoutingPreference = type;
        return this;
    }
}
export class DrivingOptions {
    constructor() {

    }
    departureTime?: string;
}

//----------------------------------------------------------------

export class DirectionsRoute {
    geocoded_waypoints?: GeocodedWaypoints;
    routes?: Array<Routes>;
    status?: string;

    constructor(init?: Partial<DirectionsRoute>) {
        Object.assign(this, init);
    }

}

export class GeocodedWaypoints {
    geocoder_status?: string;
    place_id?: string;
    types?: Array<string>;

    constructor(init?: Partial<GeocodedWaypoints>) {
        Object.assign(this, init);
    }
}

export class Routes {
    bounds?: Bounds;
    copyrights?: string;
    fare?: Fare;
    legs?: Array<Legs>;
    overview_polyline?: Polyline;
    summary?: string;
    warnings?: Array<string>;
    waypoint_order?: Array<Number>;

    endtime?: string;
    start_time?: string;

    constructor(init?: Partial<Routes>) {
        Object.assign(this, init);
    }



    public get overviewPath(): Array<Northeast> {

        if (this.overview_polyline?.points == null || this.overview_polyline?.points == "")
            return null;



        return [];

        // .decodePolyline(overviewPolyline!.points!)
        // .map((it) => Northeast(lat: it[0].toDouble(), lng: it[1].toDouble()))
        // .toList();

    }



}

export class Bounds {
    northeast?: Northeast;
    southwest?: Northeast;

    constructor(init?: Partial<Bounds>) {
        Object.assign(this, init);
    }
}

export class Northeast {
    lat?: number;
    lng?: number;

    constructor(init?: Partial<Northeast>) {
        Object.assign(this, init);
    }

}

export class Fare {
    currency?: string;
    text?: string;
    value?: number;

    constructor(init?: Partial<Northeast>) {
        Object.assign(this, init);
    }

}

export class ViaWaypoint {
    lat?: number;
    lng?: number;
    constructor(init?: Partial<ViaWaypoint>) {
        Object.assign(this, init);
    }
}

export class Legs {
    arrival_time?: ArrivalTime;
    departureime?: ArrivalTime;
    distance?: Distance;
    duration?: Distance;
    end_address?: string;
    end_location;
    start_address?: Northeast;
    start_location?: Northeast;
    steps?: Array<Steps>;
    traffic_speed_entry?: Array<string>;
    viaWaypoint?: Array<ViaWaypoint>;
    constructor(init?: Partial<Legs>) {
        Object.assign(this, init);
    }

}

export class ArrivalTime {
    text?: string;
    time_zone?: string;
    value?: Date;

    constructor(init?: Partial<ArrivalTime>) {
        Object.assign(this, init);
    }

}

export class Distance {
    text?: string;
    value?: number;

    constructor(init?: Partial<Distance>) {
        Object.assign(this, init);
    }


}

export class DirectionsDuration {
    text?: string;
    value?: number;
    route_time?: string;

    constructor(init?: Partial<DirectionsDuration>) {
        Object.assign(this, init);
    }

}

export class Steps {
    distance?: Distance;
    duration?: DirectionsDuration;
    end_location?: Northeast;
    html_instructions?: string;
    polyline?: Polyline;
    start_location?: Northeast;
    steps?: Array<Steps>;
    travel_mode?: MaasTravelMode;
    transit_details?: TransitDetails; // transit
    extra?: string;
    maneuver?: string;

    constructor(init?: Partial<Steps>) {
        Object.assign(this, init);
    }
}

export class Polyline {
    points?: string;

    constructor(init?: Partial<Polyline>) {
        Object.assign(this, init);
    }

    public getPoints() {
        let ps = decode(this.points);
        return ps;
    }
}

export class TransitDetails {
    arrival_stop?: ArrivalStop;
    arrival_time?: ArrivalTime;
    departure_stop?: ArrivalStop;
    departure_time?: ArrivalTime;
    headsign?: string;
    line?: Line;
    num_stops?: number;
    trip_short_name?: string;

    constructor(init?: Partial<TransitDetails>) {
        Object.assign(this, init);
    }

}

export class ArrivalStop {
    location?: Northeast;
    name?: string;

    constructor(init?: Partial<ArrivalStop>) {
        Object.assign(this, init);
    }

}

export class Line {
    agencies?: Array<Agencies>;
    color?: string;
    name?: string;
    short_name?: string;
    text_color?: string;
    vehicle?: Vehicle;
    constructor(init?: Partial<Line>) {
        Object.assign(this, init);
    }

}

export class Agencies {
    name?: string;
    url?: string;

    constructor(init?: Partial<Agencies>) {
        Object.assign(this, init);
    }
}

export class Vehicle {
    icon?: string;
    local_icon?: string;
    name?: string;
    type?: string;

    constructor(init?: Partial<Vehicle>) {
        Object.assign(this, init);
    }
}

export class GeoCoord {
    latitude: number;
    longitude: number;
    constructor(latitude: number, longitude: number) {

        latitude = (latitude < -90.0 ? -90.0 : (90.0 < latitude ? 90.0 : latitude));
        longitude = (longitude + 180.0) % 360.0 - 180.0;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public toString() { return `$runtimeType(${this.latitude}}, ${this.longitude})` };

}



//----------------------------------------------------------------

export class PlaceDetail {
    html_attributions?: Array<string>;
    result?: PlaceDetailResult;
    status?: string;

    constructor(init?: Partial<PlaceDetail>) {
        Object.assign(this, init);
    }

}
export class PlaceDetailResult {
    address_components?: Array<AddressComponent>;
    adr_address?: string;// 地址分層 html格式
    formatted_address?: string;// 地址
    geometry?: Geometry;
    icon?: string;
    icon_background_color?: string;
    icon_mask_base_uri?: string;
    name?: string;
    place_id?: string;
    plus_code?: PlusCode;
    reference?: string;
    types?: Array<string>;
    url?: string;
    utc_offset?: number;

    constructor(init?: Partial<PlaceDetailResult>) {
        Object.assign(this, init);
    }

}
export class AddressComponent {
    long_name?: string;
    short_name?: string;
    types?: Array<string>;

    constructor(init?: Partial<AddressComponent>) {
        Object.assign(this, init);
    }

}

//----------------------------------------------------------------
export class AddressDetail {
    plus_code?: AddressPlusCode
    results?: Array<AddressResult>;
    status?: string;

    constructor(init?: Partial<AddressDetail>) {
        Object.assign(this, init);
    }

    public getFirstLocation?() {
        if (this.results == null || this.results.length == 0)
            return null;

        return this.results[0].geometry.location;
    }

}
export class AddressPlusCode {
    compound_code?: string
    global_code?: string
    constructor(init?: Partial<PlaceDetailResult>) {
        Object.assign(this, init);
    }
}
export class AddressResult {
    address_components?: Array<AddressResult>;
    formatted_address?: string;// 地址
    geometry?: Geometry;
    place_id?: string;
    types?: Array<string>;


    constructor(init?: Partial<PlaceDetailResult>) {
        Object.assign(this, init);
    }

}

//------------------------------------------------------------------
export class PlaceAutocompleteResult {
    predictions?: Array<Prediction>
    status?: string
    constructor(init?: Partial<PlaceAutocompleteResult>) {
        Object.assign(this, init);
    }
}

export class Prediction {
    description?: string
    matched_substrings?: Array<MatchedSubstring>
    place_id?: string
    reference?: string;
    structured_formatting?: StructuredFormatting;
    terms?: Array<Term>
    types?: Array<string>
    constructor(init?: Partial<Prediction>) {
        Object.assign(this, init);
    }
}

export class MatchedSubstring {
    length?: number
    offset?: number
    constructor(init?: Partial<MatchedSubstring>) {
        Object.assign(this, init);
    }
}

export class StructuredFormatting {
    main_text?: string
    main_text_matched_substrings?: Array<MainTextMatchedSubstring>
    secondary_text?: string
    constructor(init?: Partial<StructuredFormatting>) {
        Object.assign(this, init);
    }
}

export class MainTextMatchedSubstring {
    length?: number
    offset?: number
    constructor(init?: Partial<MainTextMatchedSubstring>) {
        Object.assign(this, init);
    }
}

export class Term {
    offset?: number
    value?: string
    constructor(init?: Partial<Term>) {
        Object.assign(this, init);
    }
}
