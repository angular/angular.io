// #docregion
import { Component } from '@angular/core';
import { Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

import { NavComponent } from './shared';
import { DashboardComponent } from './+dashboard';
import { HeroesComponent, HeroService } from './+heroes';

@Component({
  selector: 'toh-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES, NavComponent],
  providers: [
    ROUTER_PROVIDERS,
    HeroService
  ]
})
@Routes([
  { path: '/dashboard', component: DashboardComponent }, // , useAsDefault: true}, // coming soon
  { path: '/heroes/...', component: HeroesComponent },
])
export class AppComponent {}
