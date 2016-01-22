// #docplaster
// #docregion
// #docregion v1
import { Component }          from 'angular2/core';
import { HeroListComponent }  from './hero-list.component';
// #enddocregion v1
import { HeroService }        from './hero.service';
// #docregion v1

@Component({
  selector: 'my-heroes',
  template: `
  <h2>Heroes</h2>
  <hero-list></hero-list>
  `,
  // #enddocregion v1
  // #docregion providers
  providers:[HeroService],
  // #enddocregion providers
// #docregion v1
  directives:[HeroListComponent]
})
export class HeroesComponent { }
// #enddocregion v1
