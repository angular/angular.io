import { Component } from '@angular/core';

import { Hero } from 'hero-profile';

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h1>Library Consumer</h1>
      <hero-profile [hero]="hero"></hero-profile>
    </div>
  `
})
export class AppComponent {
  hero = new Hero('Magneta', 'Brave as they come');
}
