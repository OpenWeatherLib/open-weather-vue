import { Coordinates2 } from "@/models/coordinates2";
import { Viewport } from "@/models/viewport";

export interface Geometry {
  location_type: string;
  viewport: Viewport;
  location: Coordinates2;
}
