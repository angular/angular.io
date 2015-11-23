// #docregion
import {Directive, ElementRef} from 'angular2/angular2';

@Directive({
    selector: '[highlight]'
})

export class Highlight {
    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor='yellow';
    }
}
// #enddocregion