import { Component } from '@angular/core';

import { ValidateDirective } from './shared/validate.directive';

@Component({
  selector: 'sg-app',
  template: '<input type="text" tohValidate>',
  directives: [ValidateDirective]
})
export class AppComponent { }
