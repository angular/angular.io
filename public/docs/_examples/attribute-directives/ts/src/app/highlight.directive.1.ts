// #docregion
import {Directive, ElementRef, Renderer} from 'angular2/angular2';

@Directive({
    selector: '[highlight]'
})

export class Highlight {
    constructor(el: ElementRef, renderer: Renderer) {
        //el.nativeElement.style.backgroundColor = 'yellow';
       renderer.setElementStyle(el, 'background-color', 'yellow');
    }
}
// #enddocregion