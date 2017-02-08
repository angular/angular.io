// #docplaster
// #docregion
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface ApiError {
  message: string;
}

@Injectable()
export class ApiErrorHandlerService {
  handle(resp: Response): Observable<Error> {
    return Observable.of(resp)
      .switchMap(response => {

        let error: ApiError;

        try {
          error = response.json().error;
        } catch (e) {
          if (response.status === 404) {
            error = {
              message: 'The requested resource was not found'
            };
          } else {
            error = {
              message: 'An unknown error has occurred'
            };
          }
        }

        return Observable.throw(error);
      });
  }
}
