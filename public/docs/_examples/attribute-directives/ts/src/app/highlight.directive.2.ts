// #docregion
import {Directive, ElementRef, Renderer} from 'angular2/angular2';

@Directive({
    selector: '[highlight]',
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
})

export class Highlight {
    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    onMouseEnter() { this._highlight("yellow"); }
    onMouseLeave() { this._highlight(null); }

    private _highlight(color: string) {
        this.renderer.setElementStyle(this.el, 'background-color', color);
    }
}
// #enddocregion