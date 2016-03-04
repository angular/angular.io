// #docplaster
// #docregion
import {Directive, ElementRef, Input} from 'angular2/core';

@Directive({
  selector: '[myHighlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HighlightDirective {

  @Input('myHighlight') highlightColor: string;

  private _el: HTMLElement;

  constructor(el: ElementRef) {
    this._el = el.nativeElement;
  }

  onMouseEnter() { this._highlight(this.highlightColor || 'cyan'); }
  onMouseLeave() { this._highlight(null); }

  private _highlight(color: string) {
    this._el.style.backgroundColor = color;
  }
}
