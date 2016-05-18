import { Component } from '@angular/core';

import { HeroComponent } from './heroes/hero.component';

@Component({
  moduleId: module.id,
  selector: 'sg-app',
  templateUrl: 'app.component.html',
  directives: [HeroComponent]
})
export class AppComponent { }
