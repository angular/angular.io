// #docregion
import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
  name: 'flyingHeroes'
})
export class FlyingHeroesPipe implements PipeTransform {
  
  transform(allHeroes) {
    return allHeroes.filter(hero => hero.canFly;);
  } 
}