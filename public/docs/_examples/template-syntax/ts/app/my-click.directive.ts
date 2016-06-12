/* tslint:disable use-output-property-decorator */
// #docplaster
import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({selector: '[myClick]'})
export class MyClickDirective {
  // #docregion my-click-output-1
  @Output('myClick') clicks = new EventEmitter<string>(); //  @Output(alias) propertyName = ...
 // #enddocregion my-click-output-1

  toggle = false;

  constructor(el: ElementRef) {
    el.nativeElement
      .addEventListener('click', (event: Event) => {
        this.toggle = !this.toggle;
        this.clicks.emit(this.toggle ? 'Click!' : '');
      });
  }
}

// #docregion my-click-output-2
@Directive({
// #enddocregion my-click-output-2
  selector: '[myClick2]',
// #docregion my-click-output-2
  outputs: ['clicks:myClick']  // propertyName:alias
})
// #enddocregion my-click-output-2
export class MyClickDirective2 {
  clicks = new EventEmitter<string>();
  toggle = false;

  constructor(el: ElementRef) {
    el.nativeElement
      .addEventListener('click', (event: Event) => {
        this.toggle = !this.toggle;
        this.clicks.emit(this.toggle ? 'Click2!' : '');
      });
  }
}
