// #docregion
import { Injectable } from '@angular/core';

import { Hero }       from './hero';
import { HEROES }     from './mock-heroes';
import { Logger }     from '../logger.service';

@Injectable()
export class HeroService {

  //#docregion ctor
  constructor(private logger: Logger) {  }
  //#enddocregion ctor

  getHeroes() {
    this.logger.log('Getting heroes ...')
    return HEROES;
  }
}
