/* tslint:disable */
// Exact copy of contact/highlight.directive except for color and message
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({ selector: '[highlight], input' })
/** Highlight the attached element or an InputElement in gray */
export class HighlightDirective {
  constructor(renderer: Renderer, el: ElementRef) {
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'lightgray');
    console.log(
      `* Shared highlight called for ${el.nativeElement.tagName}`);
  }
}
