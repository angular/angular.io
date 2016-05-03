// #docregion
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[myHighlight]',
  // #docregion host
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
  // #enddocregion host
})

export class HighlightDirective {

  // #docregion ctor
  private el:HTMLElement;
  constructor(el: ElementRef) { this.el = el.nativeElement; }
  // #enddocregion ctor

  // #docregion mouse-methods
  onMouseEnter() { this.highlight("yellow"); }
  onMouseLeave() { this.highlight(null); }

  private highlight(color: string) {
    this.el.style.backgroundColor = color;
  }
  // #enddocregion mouse-methods

}
// #enddocregion
