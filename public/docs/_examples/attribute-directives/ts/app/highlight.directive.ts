// #docplaster
// #docregion full
import {Directive, ElementRef, Input} from 'angular2/core';

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
  private _el:HTMLElement;
// #enddocregion class-1
// #enddocregion full
  /*
// #docregion highlight
  @Input() myHighlight: string;
// #enddocregion highlight
  */
// #docregion full

// #docregion defaultColor
  @Input() set defaultColor(colorName:string){
    this._defaultColor = colorName || this._defaultColor;
  }
// #enddocregion defaultColor
// #docregion class-1

// #docregion color
  @Input('myHighlight') highlightColor: string;
// #enddocregion color

// #enddocregion class-1
// #docregion class-1
  constructor(el: ElementRef) { this._el = el.nativeElement; }

// #docregion mouse-enter
  onMouseEnter() { this._highlight(this.highlightColor || this._defaultColor); }
// #enddocregion mouse-enter
  onMouseLeave() { this._highlight(null); }

  private _highlight(color:string) {
    this._el.style.backgroundColor = color;
  }
}
// #enddocregion class-1
// #enddocregion full