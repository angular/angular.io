import { Component } from '@angular/core';

import { HeroComponent } from './heroes/hero.component';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'sg-app',
  template: `
    <toh-hero></toh-hero>
    <admin-users></admin-users>
  `,
  directives: [HeroComponent, UsersComponent]
})
export class AppComponent { }
