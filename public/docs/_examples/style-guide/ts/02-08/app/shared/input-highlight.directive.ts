// #docregion
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({ selector: 'input'})
/** Highlight the attached input text element in blue */
export class InputHighlightDirective {
  constructor(renderer: Renderer, el: ElementRef) {
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'powderblue');
  }
}
