// #docplaster
// #docregion
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Renderer,
  ViewChild
} from '@angular/core';

// #docregion di
@Component({
  selector: 'full-size-base'
})
// #docregion viewchild
// #docregion afterviewinit
// #docregion hostlistener
export abstract class FullSizeBaseComponent implements AfterViewInit {

  // #enddocregion afterviewinit
  // #enddocregion hostlistener
  // #enddocregion viewchild
  // #enddocregion di
  @ViewChild('child')
  child: ElementRef;

  // #enddocregion viewchild
  width: number = 300;
  height: number = 200;
  // #docregion di

  constructor(protected renderer: Renderer) {
  }

  // #enddocregion di
  // #docregion afterviewinit
  ngAfterViewInit() {
    this.setChildSize();
  }

  // #enddocregion afterviewinit
  // #docregion hostlistener
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
    this.height = event.target.innerHeight;
    this.setChildSize();
  }

  // #enddocregion hostlistener
  private setChildSize() {
    this.renderer.setElementProperty(this.child.nativeElement, 'width', this.width);
    this.renderer.setElementProperty(this.child.nativeElement, 'height', this.height);
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
