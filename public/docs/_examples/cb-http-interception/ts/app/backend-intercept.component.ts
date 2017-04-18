// #docregion
import { Component } from '@angular/core';
import { ConnectionBackend, Http} from '@angular/http';

import { BackendInterceptService } from './backend-intercept.service';
import { HeroListComponent }   from './hero-list.component';

@Component({
  selector: 'backend-intercept',
  template: `
    <h1>Backend Intercept</h1>
    <hero-list></hero-list>
  `,
  directives: [ HeroListComponent ],
  providers:  [
    { provide: ConnectionBackend, useClass: BackendInterceptService },
    Http
  ]
})
export class BackendInterceptComponent {
}

