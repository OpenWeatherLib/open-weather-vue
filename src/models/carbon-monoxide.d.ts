import { CarbonMonoxideData } from "@/models/carbon-monoxide-data";
import { Coordinates3 } from "@/models/coordinates3";

export interface CarbonMonoxide {
    dateTime: Date;
    coordinates: Coordinates3;
    data: CarbonMonoxideData[];
}