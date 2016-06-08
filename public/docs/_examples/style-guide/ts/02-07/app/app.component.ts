import { Component } from '@angular/core';

import { HeroComponent } from './heroes';
import { UsersComponent } from './users';

@Component({
  selector: 'sg-app',
  template: `
    <toh-hero></toh-hero>
    <admin-users></admin-users>
  `,
  directives: [HeroComponent, UsersComponent]
})
export class AppComponent { }
