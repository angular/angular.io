/* tslint:disable:no-unused-variable */
// #docregion
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[myHighlight]'
})

export class HighlightDirective {
  // #docregion ctor
  private el: HTMLElement;

  constructor(el: ElementRef) { this.el = el.nativeElement; }
  // #enddocregion ctor

  // #docregion mouse-methods, host
  @HostListener('mouseenter') onMouseEnter() {
    // #enddocregion host
    this.highlight('yellow');
    // #docregion host
  }

  @HostListener('mouseleave') onMouseLeave() {
    // #enddocregion host
    this.highlight(null);
    // #docregion host
  }
  // #enddocregion host

  private highlight(color: string) {
    this.el.style.backgroundColor = color;
  }
  // #enddocregion mouse-methods

}
// #enddocregion
