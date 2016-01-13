// #docregion
// #docregion pure
import {Flyer} from './heroes';
import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'flyingHeroes' })
export class FlyingHeroesPipe implements PipeTransform {
  transform(allHeroes:Flyer[]) {
    // #docregion filter
    return allHeroes.filter(hero => hero.canFly);
    // #enddocregion filter
  }
}
// #enddocregion pure

/////// Identical except for the pure flag
// #docregion impure
// #docregion pipe-decorator
@Pipe({
  name: 'flyingHeroes',
  pure: false
})
// #enddocregion pipe-decorator
export class FlyingHeroesImpurePipe extends FlyingHeroesPipe {}
// #enddocregion impure
