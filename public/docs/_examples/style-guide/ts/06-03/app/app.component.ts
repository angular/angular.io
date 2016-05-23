import { Component } from '@angular/core';

import { ValidatorDirective } from './shared/validator.directive';

@Component({
  selector: 'sg-app',
  template: '<input type="text" tohValidator>',
  directives: [ValidatorDirective]
})
export class AppComponent { }
