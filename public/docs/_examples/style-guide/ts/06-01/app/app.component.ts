import { Component } from '@angular/core';

import { HighlightDirective } from './shared';

@Component({
  moduleId: module.id,
  selector: 'sg-app',
  templateUrl: 'app.component.html',
  directives: [HighlightDirective]
})
export class AppComponent { }
