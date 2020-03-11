/* eslint-disable */
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { validate, required } from "@/decorator";
import { ValidationRequiredType } from "@/enums";
import { any, format } from "@/helper";
import { City, City2 } from "@/models";
import { apiService } from "@/services/api.service";

class CityService {
  private readonly url: string = "http://www.datasciencetoolkit.org/maps/api/geocode/json?address={0}";

  @validate(of(undefined))
  loadCityData(@required(ValidationRequiredType.String) cityName: string): Observable<City | undefined> {
    return apiService.get<City>(format(this.url, cityName))
      .pipe(map((response: any) => {
        if (!!response && !!response.status && response.status === "OK" && any(response.results)) {
          const city2: City2 = response.results[0];

          return {
            id: -1,
            name: city2.address_components[0].short_name,
            country: city2.address_components[1].short_name,
            population: -1,
            coord: { lat: city2.geometry.location.lat, lon: city2.geometry.location.lng }
          } as City;
        }

        return undefined;
      }));
  }
}

// Export a singleton instance in the global namespace
export const cityService = new CityService();
