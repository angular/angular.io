import {Injectable} from 'angular2/core';
import {Logger} from './logger.service';
import {Hero} from './hero';

@Injectable()
export class BackendService {
  constructor(private _logger: Logger) {}

  getAll<T>(type: {new(...args:any[]): any }) : any[]{
    if (type === Hero) {
      // TODO get from the database and return as a promise
      return [
        new Hero('Windstorm', 'Weather mastery'),
        new Hero('Mr. Nice', 'Killing them with kindness'),
        new Hero('Magneta', 'Manipulates metalic objects')];
    }
    let err = new Error('Cannot get object of this type');
    this._logger.error(err);
    throw err;
  }
}