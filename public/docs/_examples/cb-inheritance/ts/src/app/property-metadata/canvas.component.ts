// #docplaster
// #docregion
import { Component, ElementRef, Renderer, ViewChild } from '@angular/core';

import { FullSizeBaseComponent } from './full-size-base.component';

// #docregion di
@Component({
  selector: 'my-canvas',
  template: '<canvas #canvas></canvas>',
  styles: [`canvas { border: 1px solid black; }`]
})
// #docregion viewchild
// #docregion afterviewinit
// #docregion hostlistener
export class CanvasComponent extends FullSizeBaseComponent {

  // #enddocregion afterviewinit
  // #enddocregion hostlistener
  // #enddocregion di
  @ViewChild('canvas')
  child: ElementRef;

  // #enddocregion viewchild
  // #docregion di

  constructor(renderer: Renderer, private elementRef: ElementRef) {
    super(renderer);
  }

  // #enddocregion di
  // #docregion afterviewinit
  ngAfterViewInit() {
    super.ngAfterViewInit(); // Must call super!
    this.draw();
  }

  // #enddocregion afterviewinit
  // #docregion hostlistener
  onResize(event: any) {
    super.onResize(event);
    this.draw();
  }

  // #enddocregion hostlistener
  private draw() {
    const ctx: CanvasRenderingContext2D = this.child.nativeElement.getContext('2d');
    ctx.fillRect(10, 10, 100, 100);
  }
  // #docregion viewchild
  // #docregion afterviewinit
  // #docregion hostlistener
  // #docregion di
}
// #enddocregion viewchild
// #enddocregion afterviewinit
// #enddocregion hostlistener
// #enddocregion di
