// #docregion
import { Directive, HostBinding, HostListener } from 'angular2/core';

// #docregion example
/* avoid */

@Directive({
  selector: '[tohValidator]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    'attr.role': 'button'
  }
})
export class ValidatorDirective {
  role = 'button';
  onMouseEnter() {
    // do work
  }
}
export class ValidateDirective { }
// #enddocregion example
