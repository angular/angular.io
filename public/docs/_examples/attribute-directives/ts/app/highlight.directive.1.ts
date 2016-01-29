// #docregion
import {Directive, ElementRef, Input} from 'angular2/core';

@Directive({
    selector: '[myHighlight]'
})

export class HighlightDirective {
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'yellow';
    }
}
// #enddocregion