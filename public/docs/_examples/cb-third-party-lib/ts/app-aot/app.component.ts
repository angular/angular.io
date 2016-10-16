import { Component } from '@angular/core';

import { Hero } from 'hero-profile';

@Component({
  selector: 'my-aot-app',
  template: `<div>
              <h1 class="aot">Library consumed by AoT application</h1>
              <hero-profile [hero]="hero"></hero-profile>
             </div>`
})
export class AppComponent {
  hero = new Hero('Bombasto', 'Bombastic at times');
}
