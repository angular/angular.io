// #docplaster
// #docregion full
import {Directive, ElementRef, Renderer, Input} from 'angular2/angular2';

@Directive({
  selector: '[my-highlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})

// #docregion class
export class Highlight {
// #enddocregion class
// #enddocregion full
  /*
// #docregion highlight
  @Input() myHighlight: string;
// #enddocregion highlight
  */
// #docregion full
// #docregion class
// #docregion color
  @Input('my-highlight') highlightColor: string;
// #enddocregion color

  private _defaultColor = 'red';

  constructor(private el: ElementRef, private renderer: Renderer) { }

// #docregion mouse-enter
  onMouseEnter() { this._highlight(this.highlightColor || this._defaultColor); }
// #enddocregion mouse-enter
  onMouseLeave() { this._highlight(null); }

  private _highlight(color:string) {
    this.renderer.setElementStyle(this.el, 'background-color', color);
  }

}
// #enddocregion class
// #enddocregion full