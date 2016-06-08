import { Component } from '@angular/core';

import { HeroComponent } from './heroes';

@Component({
  moduleId: module.id,
  selector: 'sg-app',
  templateUrl: 'app.component.html',
  directives: [HeroComponent]
})
export class AppComponent { }
