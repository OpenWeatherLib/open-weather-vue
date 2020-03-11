import { AddressComponent } from "@/models/address-component";
import { Geometry } from "@/models/geometry";

export interface City2 {
  address_components: AddressComponent[];
  geometry: Geometry;
  types: string[];
}
