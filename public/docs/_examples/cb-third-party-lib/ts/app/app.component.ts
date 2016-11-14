import { Component } from '@angular/core';

import { Hero } from 'hero-profile';

@Component({
  selector: 'my-jit-app',
  template: `<div>
              <h1 class="jit">Library consumed by JiT application</h1>
              <hero-profile [hero]="hero"></hero-profile>
            </div>`
})
export class AppComponent {
  hero = new Hero('Magneta', 'Brave as they come');
}
