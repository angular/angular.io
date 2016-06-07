// #docplaster
// #docregion full
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[myHighlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
// #docregion class-1
export class HighlightDirective {
  private _defaultColor = 'red';
  private el: HTMLElement;

  constructor(el: ElementRef) { this.el = el.nativeElement; }
  // #enddocregion class-1

  // #docregion defaultColor
  @Input() set defaultColor(colorName: string){
    this._defaultColor = colorName || this._defaultColor;
  }
  // #enddocregion defaultColor
  // #docregion class-1

  // #docregion color
  @Input('myHighlight') highlightColor: string;
  // #enddocregion color

  // #docregion mouse-enter
  onMouseEnter() { this.highlight(this.highlightColor || this._defaultColor); }
  // #enddocregion mouse-enter
  onMouseLeave() { this.highlight(null); }

  private highlight(color: string) {
    this.el.style.backgroundColor = color;
  }
}
// #enddocregion class-1
// #enddocregion full
/*
// #docregion highlight
@Input() myHighlight: string;
// #enddocregion highlight
*/
