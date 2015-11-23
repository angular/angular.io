// #docregion
import {Directive, ElementRef} from 'angular2/angular2';

@Directive({
    selector: '[highlight]',
    host: {
         '(mouseenter)': 'onMouseEnter()',
         '(mouseleave)': 'onMouseLeave()'
        }
 })

export class Highlight {
    constructor(private el: ElementRef) {
    }

    onMouseEnter() {
        this.el.nativeElement.style.backgroundColor='yellow';
    }
    onMouseLeave() {
        this.el.nativeElement.style.backgroundColor= null;
    }
}
// #enddocregion