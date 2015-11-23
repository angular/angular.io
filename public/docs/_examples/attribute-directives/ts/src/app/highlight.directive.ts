// #docregion
import {Directive, ElementRef, Input, Renderer} from 'angular2/angular2';

@Directive({
  selector: '[highlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})

export class Highlight {
  @Input('highlight') color: string;
  private _defaultColor = 'red';
  constructor(private el: ElementRef, private renderer: Renderer) { }

  onMouseEnter() { this._highlight(this.color || this._defaultColor); }
  onMouseLeave() { this._highlight(null); }

  private _highlight(color:string) {
    // this.el.nativeElement.style.backgroundColor=color;
    // this.el.nativeElement.setAttribute('background-color', color);
    this.renderer.setElementStyle(this.el, 'background-color', color);
  }

}
// #enddocregion