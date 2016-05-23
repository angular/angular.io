// #docregion
import { Directive, HostBinding, HostListener } from '@angular/core';

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
// #enddocregion example
