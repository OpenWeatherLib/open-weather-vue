import { NitrogenDioxideData } from "@/models/nitrogen-dioxide-data";
import { Coordinates3 } from "@/models/coordinates3";

export interface NitrogenDioxide {
  dateTime: Date;
  coordinates: Coordinates3;
  data: NitrogenDioxideData;
}
