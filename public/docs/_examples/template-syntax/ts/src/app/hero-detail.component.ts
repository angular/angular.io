import {Component, Input, Output, EventEmitter} from 'angular2/core';

import {Hero} from './hero';

let nextHeroDetailId = 1;

// #docregion input-output-2
@Component({
// #enddocregion input-output-2
  selector: 'hero-detail',
  // #docregion input-output-2
  inputs: ['hero'],
  outputs: ['deleted'],
  // #enddocregion input-output-2
  template: `
  <div id="lh{{id}}">
    {{hero?.fullName}}
    <img src="{{heroImageUrl}}" style="height:24px">
    <a href="#lh{{id}}" (click)="onDelete()">delete</a>
  </div>`
// #docregion input-output-2
})
// #enddocregion input-output-2
export class HeroDetailComponent {
  hero: Hero;
// #docregion deleted
  deleted = new EventEmitter<Hero>();
  onDelete() {
    this.deleted.emit(this.hero);
  }
// #enddocregion

  // heroImageUrl = 'http://www.wpclipart.com/cartoon/people/hero/hero_silhoutte_T.png';
  // Public Domain terms of use: http://www.wpclipart.com/terms.html
  heroImageUrl = 'images/hero.png';
  id = nextHeroDetailId++;

}

@Component({
  selector: 'big-hero-detail',
  /*
  inputs: ['hero'],
  outputs: ['deleted'],
  */
  template: `
  <div style="border: 1px solid black; padding:3px">
    <img src="{{heroImageUrl}}" style="float:left; margin-right:8px;">
    <div><b>{{hero?.fullName}}</b></div>
    <div>First: {{hero?.firstName}}</div>
    <div>Last: {{hero?.lastName}}</div>
    <div>Birthdate: {{hero?.birthdate | date:'longDate'}}</div>
    <div>Web: <a href="{{hero?.url}}" target="_blank">{{hero?.url}}</a></div>
    <div>Rate/hr: {{hero?.rate | currency:'EUR'}}</div>
    <br clear="all">
    <button (click)="onDelete()">Delete</button>
  </div>
  `
})
export class BigHeroDetailComponent extends HeroDetailComponent {

  // #docregion input-output-1
  @Input()  hero: Hero;
  @Output() deleted = new EventEmitter<Hero>();
  // #enddocregion input-output-1

  onDelete() {
    this.deleted.emit(this.hero);
  }
}
