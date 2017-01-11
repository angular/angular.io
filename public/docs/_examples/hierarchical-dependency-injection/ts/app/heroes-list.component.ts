// #docregion
import { Component }  from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Hero }          from './hero';
import { HeroesService } from './heroes.service';

@Component({
  selector: 'heroes-list',
  template: `
    <div>
      <h3>Heroes</h3>
      <ul>
        <li *ngFor="let hero of heroes | async" (click)="addCard(hero)">
          {{hero.name}} ({{hero.power}})
        </li>
      </ul>
      <hero-card
        *ngFor="let selectedHero of selectedHeroes; let i = index"
        [hero]="selectedHero"
        (close)="closeCard(i)">
      </hero-card>
    </div>
    `,
  styles: [ 'li {cursor: pointer;}' ]
})
export class HeroesListComponent {
  heroes: Observable<Hero[]>;
  selectedHeroes: Hero[] = [];

  constructor(private heroesService: HeroesService) {
    this.heroes = heroesService.getHeroes();
  }

  addCard(hero: Hero) {
    this.selectedHeroes.push(hero);
  }

  closeCard(ix: number) {
    this.selectedHeroes.splice(ix, 1);
  }
}


// #enddocregion
