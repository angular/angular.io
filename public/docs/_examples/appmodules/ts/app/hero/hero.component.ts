import { Component, Inject } from '@angular/core';

import { HeroService }        from './hero.service';

@Component({
  template: `
    <h2>Heroes of {{userName}}</h2>
    <router-outlet></router-outlet>
  `,
  providers: [HeroService] // SHOULD NOT BE NECESSARY
})
export class HeroComponent {
  userName = '';
  constructor(
    @Inject('UserService') userService: {userName: string}
  ) {
    this.userName = userService.userName;
  }
}
