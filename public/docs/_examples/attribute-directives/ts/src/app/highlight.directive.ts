// #docregion
import {Directive, ElementRef, Renderer, Input} from 'angular2/angular2';

@Directive({
  selector: '[highlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})

export class Highlight {
  @Input() highlight: string;
  private _defaultColor = 'red';
  constructor(private el: ElementRef, private renderer: Renderer) { }

  onMouseEnter() { this._highlight(this.highlight || this._defaultColor); }
  onMouseLeave() { this._highlight(null); }

  private _highlight(color:string) {
    this.renderer.setElementStyle(this.el, 'background-color', color);
  }

}
// #enddocregion