// #docregion
import { Directive, ElementRef, Renderer } from '@angular/core';

// Same directive name and selector as
// HighlightDirective in parent AppRootModule
// It selects for both input boxes and  'highlight' attr
// and it highlights in beige instead of yellow
@Directive({ selector: '[highlight]' })
export class HighlightDirective {
    constructor(renderer: Renderer, el: ElementRef) {
    renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'beige');
       console.log(`* Hero highlight called for ${el.nativeElement.tagName}`);
    }
}
