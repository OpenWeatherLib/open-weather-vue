import { SulfurDioxideData } from "@/models/sulfur-dioxide-data";
import { Coordinates3 } from "@/models/coordinates3";

export interface SulfurDioxide {
  dateTime: Date;
  coordinates: Coordinates3;
  data: SulfurDioxideData[];
}
