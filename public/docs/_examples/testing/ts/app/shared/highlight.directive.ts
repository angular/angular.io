import { Directive, ElementRef, Input, OnChanges, Renderer } from '@angular/core';

@Directive({ selector: '[highlight]' })
/**
 * Set backgroundColor for the attached element ton highlight color and
 * set element `customProperty` = true
 */
export class HighlightDirective implements OnChanges {

  static defaultColor =  'rgb(211, 211, 211)'; // lightgray

  @Input('highlight') bgColor: string;

  constructor(private renderer: Renderer, private el: ElementRef) {
    renderer.setElementProperty(el.nativeElement, 'customProperty', true);
  }

  ngOnChanges() {
    this.renderer.setElementStyle(
      this.el.nativeElement, 'backgroundColor',
      this.bgColor || HighlightDirective.defaultColor );
  }
}

