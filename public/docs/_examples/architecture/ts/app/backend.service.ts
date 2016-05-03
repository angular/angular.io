import {Injectable, Type} from '@angular/core';
import {Logger} from './logger.service';
import {Hero} from './hero';

const HEROES = [
        new Hero('Windstorm', 'Weather mastery'),
        new Hero('Mr. Nice', 'Killing them with kindness'),
        new Hero('Magneta', 'Manipulates metalic objects')
      ];

@Injectable()
export class BackendService {
  constructor(private _logger: Logger) {}

  getAll(type:Type) : PromiseLike<any[]>{
    if (type === Hero) {
      // TODO get from the database
      return Promise.resolve<Hero[]>(HEROES);
    }
    let err = new Error('Cannot get object of this type');
    this._logger.error(err);
    throw err;
  }
}