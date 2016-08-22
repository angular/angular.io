// #docplaster
import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { CrisisCenterComponent } from './crisis-center/crisis-center.component.1';
import { DialogService }         from './dialog.service';
import { HeroService }           from './heroes/hero.service';

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
  <a [routerLink]="['CrisisCenter', 'CrisisList']">Crisis Center</a>
  // #enddocregion cc-anchor-no-default
  */
  /* Crisis Center Detail link
  // #docregion Dragon-anchor
  <a [routerLink]="['CrisisCenter', 'CrisisDetail', {id:1}]">Dragon Crisis</a>
  // #enddocregion Dragon-anchor
  */
// #docregion template
  template: `
    <h1 class="title">Component Router (Deprecated)</h1>
    <nav>
      <a [routerLink]="['CrisisCenter', 'CrisisList']">Crisis Center</a>
      <a [routerLink]="['CrisisCenter', 'CrisisDetail', {id:1}]">Dragon Crisis</a>
      <a [routerLink]="['CrisisCenter', 'CrisisDetail', {id:2}]">Shark Crisis</a>
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
