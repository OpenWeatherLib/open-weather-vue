import { Coordinates3 } from "@/models/coordinates3";

export interface Ozone {
    dateTime: Date;
    coordinates: Coordinates3;
    data: number;
}