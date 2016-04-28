// #docregion
// #docregion example
/* avoid */

import { ExceptionService, SpinnerService, ToastService } from '../../../app/shared';
import { Http, Response } from 'angular2/http';
import { Injectable } from 'angular2/core';
import { Hero } from './hero.model';
// #enddocregion example

@Injectable()
export class HeroService {

  constructor(
    private exceptionService: ExceptionService,
    private spinnerService: SpinnerService,
    private toastService: ToastService,
    private http: Http
  ) { }

  getHero(id: number) {
    return this.http.get(`api/heroes/${id}`)
      .map((res: Response) => res.json().data);
  }

  getHeroes() {
    return this.http.get(`api/heroes`)
      .map((res: Response) => res.json().data);
  }

}

