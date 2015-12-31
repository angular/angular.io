// #docregion
import {Injectable} from 'angular2/core';
import {Hero} from '../hero';

@Injectable()
export class Heroes {
  get() {
    return [
      new Hero(1, 'Windstorm'),
      new Hero(2, 'Spiderman')
    ];
  }
}
