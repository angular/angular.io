import {Injectable} from 'angular2/core';
import {Hero} from './hero';
import {BackendService} from './backend.service';
import {Logger} from './logger.service';

// #docregion class
@Injectable()
export class HeroService {
  constructor(private _backend: BackendService, private _logger:Logger){}

  getHeroes() {
    // TODO return as a promise
    let heroes = <Hero[]> this._backend.getAll(Hero);
    this._logger.log(`Got ${heroes.length} heroes from the server.`);
    return heroes;
  }
}
// #enddocregion class