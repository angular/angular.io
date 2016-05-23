import { Component } from '@angular/core';

import { HEROES_URL, VILLAINS_URL } from './shared/data.service';

@Component({
  selector: 'sg-app',
  template: `
    <div>Heroes url: {{heroesUrl}}</div>
    <div>Villains url: {{villainsUrl}}</div>
  `,
})
export class AppComponent {
  heroesUrl = HEROES_URL;
  villainsUrl = VILLAINS_URL;
}
