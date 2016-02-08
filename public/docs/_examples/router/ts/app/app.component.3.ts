// #docplaster
import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

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
  <a [routerLink]="['Heroes']">Heroes</a>
  // #enddocregion h-anchor
  */
  /* Incomplete Crisis Center link when CC lacks a default
  // #docregion cc-anchor-fail
  // The link now fails with a "non-terminal link" error
  // #docregion cc-anchor-w-default
  <a [routerLink]="['CrisisCenter']">Crisis Center</a>
  // #enddocregion cc-anchor-w-default
  // #enddocregion cc-anchor-fail
  */
  /* Crisis Center link when CC lacks a default
  // #docregion cc-anchor-no-default
  <a [routerLink]="['CrisisCenter', 'CrisisCenter']">Crisis Center</a>
  // #enddocregion cc-anchor-no-default
  */
  /* Crisis Center Detail link
  // #docregion princess-anchor
  <a [routerLink]="['CrisisCenter', 'CrisisDetail', {id:1}]">Princess Crisis</a>
  // #enddocregion princess-anchor
  */
// #docregion template
  template: `
    <h1 class="title">Component Router</h1>
    <nav>
      <a [routerLink]="['CrisisCenter', 'CrisisCenter']">Crisis Center</a>
      <a [routerLink]="['CrisisCenter', 'CrisisDetail', {id:1}]">Princess Crisis</a>
      <a [routerLink]="['CrisisCenter', 'CrisisDetail', {id:2}]">Dragon Crisis</a>
    </nav>
    <router-outlet></router-outlet>
  `,
// #enddocregion template
  providers:  [DialogService, HeroService],
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  {path: '/crisis-center/...', name: 'CrisisCenter', component: CrisisCenterComponent},
])
export class AppComponent { }
