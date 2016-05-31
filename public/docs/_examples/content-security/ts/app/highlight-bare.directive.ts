// #docregion
import { Directive, ElementRef, Input } from '@angular/core';


@Directive({
  selector: '[bareHighlight]',
  host: {'(mouseenter)': 'onMouseEnter()',
         '(mouseleave)': 'onMouseLeave()'}
})

export class BareHighlightDirective {
  @Input('bareHighlight') highlightColor = 'red';

  constructor(private el: ElementRef) { }

  onMouseEnter() { this.highlight(this.highlightColor); }
  onMouseLeave() { this.highlight(null); }

  // #docregion highlight
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
  // #enddocregion highlight
}
