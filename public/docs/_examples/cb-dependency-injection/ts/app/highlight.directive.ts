// #docplaster
// #docregion
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[myHighlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HighlightDirective {

  @Input('myHighlight') highlightColor: string;

  private el: HTMLElement;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
  }

  onMouseEnter() { this.highlight(this.highlightColor || 'cyan'); }
  onMouseLeave() { this.highlight(null); }

  private highlight(color: string) {
    this.el.style.backgroundColor = color;
  }
}
