// #docregion
import {Injectable} from 'angular2/core';
import {Hero}       from './hero';
import {HEROES}     from './mock-heroes';
import {Logger}     from '../logger.service';

@Injectable()
export class HeroService {

  //#docregion ctor
  constructor(private _logger: Logger) {  }
  //#enddocregion ctor

  getHeroes() {
    this._logger.log('Getting heroes ...')
    return HEROES;
  }
}
