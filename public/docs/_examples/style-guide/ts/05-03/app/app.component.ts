import { Component } from '@angular/core';

import { HeroButtonComponent } from './heroes/shared/hero-button/hero-button.component';

@Component({
  moduleId: module.id,
  selector: 'sg-app',
  templateUrl: 'app.component.html',
  directives: [HeroButtonComponent]
})
export class AppComponent { }
