/* eslint-disable */
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { required, validate } from "@/decorator";
import { UnsplashImageOrientation, ValidationRequiredType } from "@/enums";
import { format } from "@/helper";
import { apiService } from "@/services/api.service";

class ImageService {
  private readonly url: string = "https://api.unsplash.com/search/photos?client_id={0}&orientation={1}&query={2}";

  @validate(of(undefined))
  loadImagePictureUrl(
    @required(ValidationRequiredType.String) clientId: string,
    @required(ValidationRequiredType.String) cityName: string,
    @required(ValidationRequiredType.Enum) orientation: UnsplashImageOrientation): Observable<string | undefined> {
    return apiService
      .get<any>(format(this.url, clientId, orientation, cityName))
      .pipe(
        map((response: any) => (!!response && !!response.total && !!response.results) ? response.results[0].urls.small : undefined),
        catchError((error: any) => { console.error(error.toString()); return of(undefined); }));
  }
}

// Export a singleton instance in the global namespace
export const imageService = new ImageService();
