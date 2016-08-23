/* tslint:disable */
// Same directive name and selector as
// HighlightDirective in parent AppModule
// It selects for both input boxes and  'highlight' attr
// and it highlights in blue instead of gold

// #docregion
import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({ selector: '[highlight], input' })
/** Highlight the attached element or an InputElement in blue */
export class HighlightDirective {
  constructor(renderer: Renderer, el: ElementRef) {
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'powderblue');
    console.log(
      `* Contact highlight called for ${el.nativeElement.tagName}`);
  }
}
