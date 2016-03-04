import {Injectable} from 'angular2/core';

@Injectable()
export class DataService {
  constructor() {
  }
  getHeroName() {
    return 'Windstorm';
  }
}
