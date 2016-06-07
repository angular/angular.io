// #docregion
import { Component } from '@angular/core';

import { SomeAbsoluteComponent, SomeRelativeComponent } from './some.component';

@Component({
selector: 'my-app',
template:
  `<h1>Absolute & <i>Component-Relative</i> Paths</h1>
  <absolute-path></absolute-path>
  <relative-path></relative-path>
  `,
  directives: [SomeAbsoluteComponent, SomeRelativeComponent]
})
export class AppComponent {}
