// #docregion
import { Directive, HostBinding, HostListener } from '@angular/core';

// #docregion example
@Directive({
  selector: '[tohValidator]'
})
export class ValidatorDirective {
  @HostBinding('attr.role') role = 'button';
  @HostListener('mouseenter') onMouseEnter() {
    // do work
  }
}
// #enddocregion example
