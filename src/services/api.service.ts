import axios from 'axios';
import { from, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { validate, required } from "@/decorator";
import { ValidationRequiredType } from "@/enums";

class ApiService {
  @validate(of(undefined))
  get<T>(@required(ValidationRequiredType.String) url: string): Observable<T | undefined> {
    return from(axios.get(url))
      .pipe(
        map((response: any) => {
          if (response.hasOwnProperty("cod") && (response["cod"] !== 200 && response["cod"] !== "200") && response.hasOwnProperty("message")) {
            console.warn(response["message"]);
            return undefined;
          }

          return response as T;
        }),
        catchError((error: any) => { console.error(error); return of(undefined); }));
  }
}

// Export a singleton instance in the global namespace
export const apiService = new ApiService();
