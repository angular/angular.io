// #docregion
import {Injectable} from 'angular2/core';
import {Hero}       from './hero';
import {HEROES}     from './mock-heroes';
import {Logger}     from '../logger.service';

@Injectable()
export class HeroService {

  constructor(private _logger: Logger) {  }

  getHeroes() {
    this._logger.log('Getting heroes ...')
    return HEROES;
  }
}
