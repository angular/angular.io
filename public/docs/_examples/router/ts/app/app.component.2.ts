/* Second Heroes version */
// #docplaster

// #docregion
import { Component, OnInit }   from '@angular/core';
import { Router, ROUTER_DIRECTIVES, Routes } from '@angular/router';

import { CrisisListComponent } from './crisis-list.component';
// #enddocregion
/*
 // Apparent Milestone 2 imports
 // #docregion
 // #docregion hero-import
 import { HeroDetailComponent }   from './heroes/hero-detail.component';
 import { HeroListComponent }     from './heroes/hero-list.component';
 import { HeroService }           from './heroes/hero.service';
 // #enddocregion hero-import
 // #enddocregion
 */
// Actual Milestone 2 imports
import { HeroDetailComponent }   from './heroes/hero-detail.component.1';
import { HeroListComponent }     from './heroes/hero-list.component.1';
import { HeroService }           from './heroes/hero.service';
// #docregion

@Component({
  selector: 'my-app',
  template: `
    <h1>Component Router</h1>
    <nav>
      <a [routerLink]="['/crisis-center']">Crisis Center</a>
      <a [routerLink]="['/heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  providers:  [HeroService],
  directives: [ROUTER_DIRECTIVES]
})
// #enddocregion
/*
 // #docregion route-config
 @Component({ ... })
 // #enddocregion route-config
 */
// #docregion
// #docregion route-config
@Routes([
// #docregion route-defs
  {path: '/crisis-center', component: CrisisListComponent},
  {path: '/heroes',        component: HeroListComponent},
  // #docregion hero-detail-route
  {path: '/hero/:id',      component: HeroDetailComponent}
  // #enddocregion hero-detail-route
// #enddocregion route-defs
])
export class AppComponent  implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/crisis-center']);
  }
}
// #enddocregion route-config
// #enddocregion
