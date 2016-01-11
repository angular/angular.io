// #docregion
import {Injectable} from 'angular2/angular2';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Logger} from './logger';

@Injectable()
class HeroService {

  heroes: Hero[];

  constructor(private logger: Logger) {
    this.heroes = HEROES;
  }

  getHeroes() {
    this.logger.log('Getting heroes ...')
    return this.heroes;
  }
}
// #enddocregion
