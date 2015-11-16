// #docregion ng-for
<li *ng-for="#hero of heroes">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
// #enddocregion ng-for

// #docregion heroes-styled
<h2>My Heroes</h2>
<ul class="heroes">
  <li *ng-for="#hero of heroes">
    <span class="badge">{{hero.id}}</span> {{hero.name}}
  </li>
</ul>
// #enddocregion heroes-styled

// #docregion selectedHero-click
<li *ng-for="#hero of heroes" (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
// #enddocregion selectedHero-click

// #docregion selectedHero-details
<h2>{{selectedHero.name}} details!</h2>
<div><label>id: </label>{{selectedHero.id}}</div>
<div>
    <label>name: </label>
    <input [(ng-model)]="selectedHero.name" placeholder="name"></input>
</div>
// #enddocregion selectedHero-details

// #docregion ng-if
<div *ng-if="selectedHero">
  <h2>{{selectedHero.name}} details!</h2>
  <div><label>id: </label>{{selectedHero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ng-model)]="selectedHero.name" placeholder="name"></input>
  </div>
</div>
// #enddocregion ng-if

// #docregion ng-class
<li *ng-for="#hero of heroes"
  [ng-class]="getSelectedClass(hero)"
  (click)="onSelect(hero)">
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
// #enddocregion ng-class