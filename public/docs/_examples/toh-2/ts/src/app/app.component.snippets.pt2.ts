// #docregion ng-for
<li *ngFor="#hero of heroes">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
// #enddocregion ng-for

// #docregion heroes-styled
<h2>My Heroes</h2>
<ul class="heroes">
  <li *ngFor="#hero of heroes">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>
// #enddocregion heroes-styled

// #docregion selectedHero-click
<li *ngFor="#hero of heroes" (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
// #enddocregion selectedHero-click

// #docregion selectedHero-details
<h2>{{selectedHero.name}} details!</h2>
<div><label>id: </label>{{selectedHero.id}}</div>
<div>
    <label>name: </label>
    <input [(ngModel)]="selectedHero.name" placeholder="name"/>
</div>
// #enddocregion selectedHero-details

// #docregion ng-if
<div *ngIf="selectedHero">
  <h2>{{selectedHero.name}} details!</h2>
  <div><label>id: </label>{{selectedHero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="selectedHero.name" placeholder="name"/>
  </div>
</div>
// #enddocregion ng-if

// #docregion hero-array-1
  public heroes: HEROES;
// #enddocregion hero-array-1

// #docregion heroes-template-1
  <h2>My Heroes</h2>
  <ul class="heroes">
    <li>
      <!-- each hero goes here -->
    </li>
  </ul>
// #enddocregion heroes-template-1

// #docregion heroes-ngfor-1
  <li *ngFor="#hero of heroes">
// #enddocregion heroes-ngfor-1

// #docregion styles-1
  styles:[`
    .heroes {list-style-type: none; margin-left: 1em; padding: 0; width: 10em;}
    .heroes li { cursor: pointer; position: relative; left: 0; transition: all 0.2s ease; }
    .heroes li:hover {color: #369; background-color: #EEE; left: .2em;}
    .heroes .badge {
      font-size: small;
      color: white;
      padding: 0.1em 0.7em;
      background-color: #369;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -1px;
    }
    .selected { background-color: #EEE; color: #369; }
  `],
// #enddocregion styles-1

// #docregion selected-hero-1
    public selectedHero: Hero;
// #enddocregion selected-hero-1

// #docregion on-select-1
    onSelect(hero: Hero) { this.selectedHero = hero; }
// #enddocregion on-select-1

// #docregion class-selected-1
    [class.selected]="hero === selectedHero"
// #enddocregion class-selected-1

// #docregion class-selected-2
<li *ngFor="#hero of heroes"
  [class.selected]="hero === selectedHero"
  (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
// #enddocregion class-selected-2
