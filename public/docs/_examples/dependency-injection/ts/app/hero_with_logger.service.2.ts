import {Injectable} from 'angular2/angular2';
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Logger} from './logger';

// #docregion
@Injectable()
class HeroService {

  heroes: Hero[];

  constructor(private logger: Logger, private useCoolFeature: boolean) {
    this.heroes = HEROES;
  }

  getHeroes() {
    let msg = this.useCoolFeature ? 'the cool new way' : 'the old way';
    this.logger.log('Getting heroes ...' + msg)
    return this.heroes;
  }
}
// #enddocregion
