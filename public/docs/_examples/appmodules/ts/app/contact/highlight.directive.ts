// #docregion
import { Directive, ElementRef } from '@angular/core';

// Same directive name and selector as
// HighlightDirective in parent AppRootModule
// The selects for both input boxes and  'highlight' attr
// and it highlights in blue instead of yellow
@Directive({ selector: 'input, [highlight]' })
export class HighlightDirective {
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'skyblue';
       console.log(`* Contact highlight called for ${el.nativeElement.tagName}`);
    }
}
