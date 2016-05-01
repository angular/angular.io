// #docregion
// #docregion example
import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';

import { Hero } from './hero.model';
import { ExceptionService, SpinnerService, ToastService } from '../../shared';
// #enddocregion example

@Injectable()
export class HeroService {
  cachedHeroes: Hero[];

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

