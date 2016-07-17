// #docregion
import { Component } from '@angular/core';

export class Hero {
  id: number;
  name: string;
}

// #docregion hero-array
const HEROES: Hero[] = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];
// #enddocregion hero-array

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <h2>My Heroes</h2>
    <ul class="heroes">
      <li *ngFor="let hero of heroes"
        role="button"
        [class.selected]="hero === selectedHero"
        [attr.aria-pressed]="hero === selectedHero"
        (click)="onSelect(hero)"
        (keydown.enter)="onSelect(hero)"
        tabindex="0">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <div *ngIf="selectedHero">
    <h3>{{selectedHero.name}} details!</h3>
    <dl>
      <dt>id:</dt>
      <dd>{{selectedHero.id}}</dd>
    </dl>
    <div>
      <label>name: 
        <input [(ngModel)]="selectedHero.name" placeholder="name">
      </label>
    </div>
    </div>
  `,
  // #docregion styles
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: black;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .heroes li.selected:hover,
    .heroes li.selected:focus{
      background-color: #BBD8DC !important;
      color: black;
    }
    .heroes li:hover,
    .heroes li:focus{
      color: white;
      background-color: #6469dd;
      left: .1em;
    }
    .heroes .text {
      position: relative;
      top: -3px;
    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #4E6570;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `]
  // #enddocregion styles
})
export class AppComponent {
  title = 'Tour of Heroes';
  heroes = HEROES;
  // #docregion selected-hero
  selectedHero: Hero;
  // #enddocregion selected-hero

  // #docregion on-select
  onSelect(hero: Hero) { this.selectedHero = hero; }
  // #enddocregion on-select
}
