// #docregion
import { Directive, ElementRef, Input }            from '@angular/core';
import { DomSanitizationService, SecurityContext } from '@angular/platform-browser';

@Directive({
  selector: '[saferHighlight]',
  host: {'(mouseenter)': 'onMouseEnter()',
         '(mouseleave)': 'onMouseLeave()'}
})

export class SaferHighlightDirective {
  @Input('saferHighlight') highlightColor = 'red';

  constructor(private el: ElementRef, private dss: DomSanitizationService) { }

  onMouseEnter() { this.highlight(this.highlightColor); }
  onMouseLeave() { this.highlight(null); }

  // #docregion highlight
  private highlight(color: string) {
    let sanitizedColor = this.dss.sanitize(SecurityContext.STYLE, color);
    this.el.nativeElement.style.backgroundColor = sanitizedColor;
  }
  // #enddocregion highlight
}
