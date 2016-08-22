/* tslint:disable:no-unused-variable */
// #docregion
import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({ selector: '[myHighlight]' })
export class HighlightDirective {
    constructor(el: ElementRef, renderer: Renderer) {
       renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
    }
}
