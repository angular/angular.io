import { Component } from '@angular/core';

import { HeroGridComponent } from './hero-grid.component';

@Component({
  selector: 'my-app',
  template: '<hero-grid></hero-grid>',
  directives: [HeroGridComponent]
})

export class AppComponent {
}
