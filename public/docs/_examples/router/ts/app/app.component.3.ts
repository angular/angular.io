/* tslint:disable:no-unused-variable */
// #docplaster
import {Component} from 'angular2/core';
import {Routes, ROUTER_DIRECTIVES} from 'angular2/alt_router';

import {CrisisCenterComponent} from './crisis-center/crisis-center.component.1';
import {HeroListComponent}     from './heroes/hero-list.component.1';
import {HeroDetailComponent}   from './heroes/hero-detail.component.1';

import {DialogService}         from './dialog.service';
import {HeroService}           from './heroes/hero.service';

@Component({
  selector: 'my-app',
// #enddocregion
  /* Typical link
  // #docregion h-anchor
  <a [routerLink]="['/heroes']">Heroes</a>
  // #enddocregion h-anchor
  */
  /* Incomplete Crisis Center link when CC lacks a default
  // #docregion cc-anchor-fail
  // The link now fails with a "non-terminal link" error
  // #docregion cc-anchor-w-default
  <a [routerLink]="['/crisis-center']">Crisis Center</a>
  // #enddocregion cc-anchor-w-default
  // #enddocregion cc-anchor-fail
  */
  /* Crisis Center link when CC lacks a default
  // #docregion cc-anchor-no-default
  <a [routerLink]="['/crisis-center/']">Crisis Center</a>
  // #enddocregion cc-anchor-no-default
  */
  /* Crisis Center Detail link
  // #docregion Dragon-anchor
  <a [routerLink]="['/crisis-center/1']">Dragon Crisis</a>
  // #enddocregion Dragon-anchor
  */
// #docregion template
  template: `
    <h1 class="title">Component Router</h1>
    <nav>
      <a [routerLink]="['/crisis-center/']">Crisis Center</a>
      <a [routerLink]="['/crisis-center/1']">Dragon Crisis</a>
      <a [routerLink]="['/crisis-center/2']">Shark Crisis</a>
    </nav>
    <router-outlet></router-outlet>
  `,
// #enddocregion template
  providers:  [DialogService, HeroService],
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/crisis-center/...', component: CrisisCenterComponent},
])
export class AppComponent { }
