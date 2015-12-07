// #docregion
import {Directive, ElementRef, Renderer, Input} from 'angular2/core';

@Directive({
    selector: '[my-highlight]'
})

export class Highlight {
    constructor(el: ElementRef, renderer: Renderer) {
        //el.nativeElement.style.backgroundColor = 'yellow';
       renderer.setElementStyle(el, 'background-color', 'yellow');
    }
}
// #enddocregion