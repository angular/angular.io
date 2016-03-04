// #docregion
import {Directive, ElementRef, Input} from 'angular2/core';

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
  private _el:HTMLElement;
  constructor(el: ElementRef) { this._el = el.nativeElement; }
  // #enddocregion ctor

  // #docregion mouse-methods
  onMouseEnter() { this._highlight("yellow"); }
  onMouseLeave() { this._highlight(null); }

  private _highlight(color: string) {
    this._el.style.backgroundColor = color;
  }
  // #enddocregion mouse-methods

}
// #enddocregion