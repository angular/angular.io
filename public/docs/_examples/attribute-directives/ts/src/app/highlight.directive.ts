// #docregion
import {Directive, ElementRef} from 'angular2/angular2';

@Directive({
    selector: '[highlight]',
    inputs: [
        'colorName: highlight'
    ],
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
})

export class Highlight {
    colorName: string;
    
    constructor(private el: ElementRef) {
    }
    
    onMouseEnter() {
        this.el.nativeElement.style.backgroundColor=this.colorName;
    }
    onMouseLeave() {
        this.el.nativeElement.style.backgroundColor= null;
    }
}
// #enddocregion