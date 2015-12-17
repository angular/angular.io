// #docregion
import {Directive, ElementRef, Renderer, Input} from 'angular2/core';

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
  constructor(private el: ElementRef, private renderer: Renderer) {
  }
  // #enddocregion ctor

  // #docregion mouse-methods
  onMouseEnter() { this._highlight("yellow"); }
  onMouseLeave() { this._highlight(null); }

  private _highlight(color: string) {
    this.renderer.setElementStyle(this.el, 'backgroundColor', color);
  }
  // #enddocregion mouse-methods

}
// #enddocregion