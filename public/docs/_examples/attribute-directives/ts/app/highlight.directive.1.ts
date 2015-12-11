// #docregion
import {Directive, ElementRef, Renderer, Input} from 'angular2/core';

@Directive({
    selector: '[myHighlight]'
})

export class Highlight {
    constructor(el: ElementRef, renderer: Renderer) {
        //el.nativeElement.style.backgroundColor = 'yellow';
       renderer.setElementStyle(el, 'backgroundColor', 'yellow');
    }
}
// #enddocregion